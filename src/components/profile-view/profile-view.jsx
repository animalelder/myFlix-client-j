import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { UserInfo } from './user-info';
import { ProfileUpdate } from './profile-update';
import FavoriteMovies from './favorite-movies';
import { ProfileDelete } from './delete-account';

export const ProfileView = ({ movies, syncUser, onLoggedOut }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [user, setUser] = useState();
  const token = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUserData = async () => {
      if (!storedUser.Username) {
        console.error('No username found in local storage');
        return;
      }

      try {
        console.log(`Fetching data for user: ${storedUser.Username}`);
        const response = await fetch(`https://jp-movies-flix-9cb054b3ade2.herokuapp.com/${storedUser.Username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response: ', response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched user data:', data);

        if (data) {
          setUser(data);
          setFavoriteMovies(data.FavoriteMovies || []); // Check if the key is correct
        } else {
          console.error('User data is null or malformed');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleUpdatedUser = (updatedData) => {
    syncUser(updatedData);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container fluid className='p-0'>
      <Row className='no-gutters'>
        <Col md={6} className='p-2'>
          <Card>
            <Card.Body>
              <UserInfo email={user.Email} name={user.Username} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className='p-2'>
          <Card>
            <Card.Body>
              <ProfileUpdate user={user} token={token} updatedUser={handleUpdatedUser} />
              <ProfileDelete user={user} token={token} onLoggedOut={onLoggedOut} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12} className='p-2'>
          <Card>
            <Card.Body>
              <FavoriteMovies
                user={user}
                setUser={setUser}
                favoriteMovies={favoriteMovies}
                setFavoriteMovies={setFavoriteMovies} // Pass the setFavoriteMovies function
                movies={movies}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;
