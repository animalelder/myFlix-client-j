import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UserInfo } from './user-info';
import { ProfileUpdate } from './profile-update';
import FavoriteMovies from './favorite-movies';
import { ProfileDelete } from "./delete-account";

export const ProfileView = ({ movies }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [user, setUser] = useState(); 
  const token = localStorage.getItem('token');
  console.log("Token before fetching user data:", token); 
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log("Stored user before checking:", storedUser);

    const fetchUserData = async () => {
      if (!storedUser || !storedUser.user || !storedUser.user.Username) {
        console.error('No username found in local storage');
        return;
      }

      console.log(`Fetching data for user: ${storedUser.user.Username}, token: ${token}`);

      try {
        const response = await fetch(`https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${storedUser.user.Username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Response: ', response);

        if (!response.ok) {
          if (response.status === 401) {
            console.error('Unauthorized - token may be invalid or expired');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched user data:', data);

        setUser(data);
        setFavoriteMovies(data.FavoriteMovies || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (storedUser && storedUser.user && storedUser.user.Username) {
      fetchUserData();
    } else {
      console.log("fetchUserData was not called because the username or user object is missing");
    }
  }, [token]);

  const handleUpdatedUser = (updatedData) => {
    setUser(updatedData);
  };

  if (!user) return <div>Loading...</div>; 

  return (
    <Container fluid className="p-0">
      <Row className="no-gutters">
        <Col md={6} className="p-2">
          <Card>
            <Card.Body>
              <UserInfo 
                email={user.Email}
                name={user.Username} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="p-2">
          <Card>
            <Card.Body>
              <ProfileUpdate
                user={user}
                token={token}
                updatedUser={handleUpdatedUser}
              />
              <ProfileDelete
                user={user}
                setUser={setUser}
                token={token}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="p-2">
          <Card>
            <Card.Body>
              <FavoriteMovies 
                user={user}
                setUser={setUser}
                favoriteMovies={favoriteMovies}
                setFavoriteMovies={setFavoriteMovies}
                movies={movies} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;
