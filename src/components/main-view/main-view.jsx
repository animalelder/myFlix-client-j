import React from 'react';
import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch('https://jp-movies-flix-9cb054b3ade2.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesApi = movies.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImageURL: movie.ImageURL,
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
              Death: movie.Director.Death,
            },
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
            Year: movie.Year,
            Featured: movie.Featured,
          };
        });
        setMovies(moviesApi);
      });
  }, [token]);

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const onLoggedOut = (user, token) => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const updatedUser = (user) => {
    setUser(user);
  };

  const syncUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/signup'
            element={
              user ? (
                <Navigate to='/' />
              ) : (
                <Col md={5}>
                  <SignupView onLoggedIn={onLoggedIn} />
                </Col>
              )
            }
          />
          <Route
            path='/login'
            element={
              user ? (
                <Navigate to='/' />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={onLoggedIn} />
                </Col>
              )
            }
          />
          <Route
            path='/users/:Username'
            element={
              !user ? (
                <Navigate to='/login' replace />
              ) : (
                <Col md={12}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    syncUser={syncUser}
                    onLoggedOut={onLoggedOut}
                  />
                </Col>
              )
            }
          />
          <Route
            path='/movies/:movieId'
            element={
              !user ? (
                <Navigate to='/login' replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={6}>
                  <MovieView setUser={setUser} token={token} user={user} movies={movies} />
                </Col>
              )
            }
          />
          <Route
            path='/'
            element={
              !user ? (
                <Navigate to='/login' replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className='mb-4' key={movie.id} md={3}>
                      <MovieCard movie={movie} user={user} setUser={setUser} />
                    </Col>
                  ))}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
