import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

export const ProfileUpdate = ({ user, updatedUser }) => {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem('user'));

  // Initialize state with the current user's data
  const [username, setUsername] = useState(user.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email || "");
  // Format the birthday date properly
  const formattedBirthday = user.Birthday ? user.Birthday.split('T')[0] : ""; // Use only the date part
  const [birthday, setBirthday] = useState(formattedBirthday);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    console.log("Data to be sent:", data); // Add this line to log the data
    console.log("Token:", token);

    fetch(`https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${storedUser.user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Response from update: ", response);
        if (!response.ok) {
          return response.text().then((text) => {
            console.error('Error: ', text);
            throw new Error(text);
          });
        }
        return response.json(); // Return user data from the response
      })
      .then((data) => {
        if (data && data.Username) { // Check if data is valid
          console.log('Updated user data: ', data);
          updatedUser(data);
          setUsername(data.Username);
          setEmail(data.Email);
          setBirthday(data.Birthday.split('T')[0]);
          // Remove reload to update the state immediately
          // window.location.reload();
        } else {
          console.error('User data is null or malformed');
        }
      })
      .catch((e) => {
        console.log('Error: ', e);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Update</h2>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <br />
      <div className="d-grid gap-2">
        <Button variant="secondary" type="submit">
          Edit Profile
        </Button>
      </div>
    </Form>
  );
};

ProfileUpdate.propTypes = {
  user: PropTypes.object.isRequired,
  updatedUser: PropTypes.func.isRequired,
};




// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { Form, Button } from "react-bootstrap";

// export const ProfileUpdate = ({user, updatedUser}) => {
//   const token = localStorage.getItem("token");

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [birthday, setBirthday] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const data = {
//       Username: username,
//       Password: password,
//       Email: email,
//       Birthday: birthday
//     }
    
//       fetch(`https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${storedUser.Username}`, 
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(data),
//       }
//       ).then((response) => {
//         console.log(response);
//         if (response.ok) {
//           console.log("Update successful!");
//           return response.json();
//         } else {
//           alert("Update failed");
//         }
//       })
//       .then((data) => {
//         updatedUser(data);
//         setUsername(data.Username);
//         setPassword(data.Password);
//         setEmail(data.Email);
//         setBirthday(data.Birthday);
//         window.location.reload();
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <h2>Update</h2>
//       <Form.Group controlId="formUsername">
//         <Form.Label>Username:</Form.Label>
//         <Form.Control
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           minLength="5"
//         />
//       </Form.Group>

//       <Form.Group controlId="formPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </Form.Group>

//       <Form.Group controlId="formBirthday">
//         <Form.Label>Birthday</Form.Label>
//         <Form.Control
//           type="date"
//           value={birthday}
//           onChange={(e) => setBirthday(e.target.value)}
//           required
//         />
//       </Form.Group>
//       <br></br>
//       <div className="d-grid gap-2">
//         <Button variant="primary" type="submit">
//           Edit Profile
//         </Button>
//       </div>
//     </Form>
//   )
// };

// ProfileUpdate.propTypes = {
//   user: PropTypes.object.isRequired,
//   updatedUser: PropTypes.func.isRequired
// };