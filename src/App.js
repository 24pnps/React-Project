import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Components/Search";
import List from "./Components/List";
import { BsFilm } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

//MY API IN MovieDB
const apiKey = '7310858bfff2d8e354ef84d4ce5d24e9';
const apiUrl_gen = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

//Function in the website that use to call search and genre
function App() {
  const [movies, setMovies] = useState([]);
  const [setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  //use fetch to call the API
  useEffect(() => {
    fetch(apiUrl_gen)
      .then(response => response.json())
      .then(data => setGenres(data.genres))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const genreId = selectedGenre.id;
      let genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

      if (searchQuery) {
        genreUrl += `&query=${encodeURIComponent(searchQuery)}`;
      }

      fetch(genreUrl)
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(error => console.error(error));
    }
  }, [selectedGenre, searchQuery]);

  function handleGenreChange(event) {
    const genreId = parseInt(event.target.value);
    const genre = genres.find(g => g.id === genreId);
    setSelectedGenre(genre);
  }

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  const handleSearch = (event) => {
    setMovies(event);
    setSelectedMovie(null);
  };

  const handleSelectMovie = (event) => {
    setSelectedMovie(event);
  };

  //The return method is generally used when want to return a single value from a component.
  return (
    <div className="App">
      <br /><br />
      <h1 className="Title"><BsFilm /></h1>
      <h1 className="Title">Movie Search</h1>
      <br />
      <Search onSearch={handleSearch} />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" htmlFor="genre-select">
          Search by select a genre:
        </InputGroup.Text>
        <Form.Select aria-label="Default select example" id="genre-select" onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </Form.Select>
      </InputGroup>
      <br /><br />
      <List movies={movies} onSelectMovie={handleSelectMovie} />
    </div>
  );
}

export default App;
