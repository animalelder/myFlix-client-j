// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// export const LoginView = ({ onLoggedIn }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const data = {
//       Username: username,
//       Password: password,
//     };

//     fetch("https://jp-movies-flix-9cb054b3ade2.herokuapp.com/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.json().then((err) => {
//             throw new Error(err.message || "Login failed");
//           });
//         }
//         return response.json(); // Parse the JSON response
//       })
//       .then((userData) => { // Rename `data` to `userData` for clarity
//         console.log("Login response: ", userData);
//         if (userData.token) { // Ensure the token is present
//           localStorage.setItem("user", JSON.stringify(userData)); // Store the whole userData
//           localStorage.setItem("token", userData.token);
//           onLoggedIn(userData, userData.token); // Pass the whole userData object
//         } else {
//           alert("No such user or invalid credentials");
//         }
//       })
//       .catch((e) => {
//         alert(`Error: ${e.message}`);
//       });
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="formUsername">
//         <Form.Label>Username:</Form.Label>
//         <Form.Control
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           minLength="3"
//         />
//       </Form.Group>

//       <Form.Group controlId="formPassword">
//         <Form.Label>Password:</Form.Label>
//         <Form.Control
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit" className="submit-button">
//         Submit
//       </Button>
//     </Form>
//   );
// };




import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://jp-movies-flix-9cb054b3ade2.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          // localStorage.setItem("username", user.Username);
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user or invalid credentials");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="submit-button">
        Submit
      </Button>
    </Form>
  );
};