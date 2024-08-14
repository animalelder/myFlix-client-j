import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ user, setUser, favoriteMovies, setFavoriteMovies, movies }) => {
  const { movieId } = useParams();
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Get the array of favorite movies based on the user data
  const favoriteMoviesArr = movies.filter((m) => favoriteMovies.includes(m.id));

  const removeFromFavorite = (movieId) => {
    fetch(
      `https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${storedUser.user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to remove from favorites");
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));

        // Update the local state for immediate UI update
        const updatedFavoriteMovies = favoriteMovies.filter((id) => id !== movieId);
        setFavoriteMovies(updatedFavoriteMovies); // Update the state to remove the movie
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Row>
        <h2>Favorite Movies</h2>
        {favoriteMoviesArr.length === 0 ? (
          <h2>No favorite movies</h2>
        ) : (
          favoriteMoviesArr.map((movie) => (
            <Col xs={12} md={6} lg={3} key={movie.id}>
              <Card className="mb-3">
                <Card.Body>
                  <img src={movie.ImageURL} alt={movie.Title} />
                  <Card.Title>
                    <h2>{movie.Title}</h2>
                  </Card.Title>
                  <Card.Text>{movie.Director.Name}</Card.Text>
                  <Link to={`/movies/${movie.id}`}>
                    <Button variant="secondary">Movie Info</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => removeFromFavorite(movie.id)} // Pass movie.id to the remove function
                  >
                    Remove Favorite
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired, // Ensure this prop is defined
  setFavoriteMovies: PropTypes.func.isRequired, // Ensure this prop is defined
  movies: PropTypes.array.isRequired, // Ensure this prop is defined
};

export default FavoriteMovies;
