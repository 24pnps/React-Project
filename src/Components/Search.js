import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

//My API
const apiKey = "7310858bfff2d8e354ef84d4ce5d24e9";
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;

//function search that recall from the APP.js on when user click on search
function Search({ onSearch }) {
    //Create a const of movie name, year, and rating
    const [movieName, setMovieName] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [voteRating, setVoteRating] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(apiUrl, {
                params: {
                    query: movieName,
                    primary_release_year: releaseYear,
                },
            });

            const filteredResults = response.data.results.filter(
                (movie) => movie.vote_average >= voteRating
            );
            onSearch(filteredResults);

        } catch (error) {
            console.error("Error fetching data from API:", error);
        }
    };

    // In this form I use a framework of bootstrap
    // Seatch by name, year and rating
    return (
        <div>
            <Form onSubmit={handleSubmit}  >
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default" >
                        Search by Name
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        placeholder="Movie Name"
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                    />
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Search by Year
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        placeholder="Release Year"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                    />
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Search by Rating
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        type="number"
                        placeholder="Rating"
                        value={voteRating}
                        onChange={(e) => setVoteRating(e.target.value)}
                    />
                    <Button variant="primary" className="btn-primary" type="submit">Search</Button>
                </InputGroup>
            </Form>
            <br />
        </div>
    );
};

export default Search;
