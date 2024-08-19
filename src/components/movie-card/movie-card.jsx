import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, user, setUser }) => {
  const isFavorite = user.FavoriteMovies.includes(movie.id);

  const addToFavorite = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `https://jp-movies-flix-9cb054b3ade2.herokuapp.com/${user.Username}/movies/${movie.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to add movie to favorites: ${response.statusText} - ${errorDetails.message}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('Movie added to favorites');
    } catch (error) {
      console.error('Error adding movie to favorites', error);
      alert(`Error: ${error.message}`);
    }
  };

  const removeFromFavorite = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `https://jp-movies-flix-9cb054b3ade2.herokuapp.com/${user.Username}/movies/${movie.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to remove movie from favorites: ${response.statusText} - ${errorDetails.message}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('Movie removed from favorites');
    } catch (error) {
      console.error('Error removing movie from favorites', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.ImageURL} />
      <Card.Body>
        <Card.Title>
          <h2>{movie.Title}</h2>
        </Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant='secondary'>Open</Button>
        </Link>
        {isFavorite ? (
          <Button variant='danger' onClick={removeFromFavorite}>
            Remove Favorite
          </Button>
        ) : (
          <Button variant='green' className='btn-green' onClick={addToFavorite}>
            Add Favorite
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

// Define prop types for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};
