import React, { useState } from "react";
import "./List.css";
import { Button } from 'react-bootstrap'
import "../App.js";


const MovieList = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const onSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const MoviePopup = ({ movie, onClosePopup }) => {
    return (
      <div className="popup">
        <div className="content">
          <Button className="close-button" onClick={onClosePopup} variant="danger">
            Back
          </Button>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="poster"
          />
  
          <div className="info">
            <h3><b>{movie.title} ({movie.release_date.substring(0, 4)})</b></h3>
            {/* <p><b>Genres:</b> {genre.name}</p> */}
            <p><b>Overview:</b> {movie.overview}</p>
            <p><b>Vote average:</b> {movie.vote_average}</p>
          </div>
        </div>
      </div>
    );
  };

  const onClosePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li
            key={movie.id}
            onClick={() => onSelectMovie(movie)}
            className="movie-list-item"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Release date: {movie.release_date}</p>
              <p>Vote average: {movie.vote_average}</p>
            </div>
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <MoviePopup movie={selectedMovie} onClosePopup={onClosePopup} />
      )}
    </div>
  );
};

export default MovieList;
