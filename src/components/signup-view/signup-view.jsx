// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// export const SignupView = () => {
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
//     };

//     fetch("https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }).then((response) => {
//       if (response.ok) {
//         alert("Signup successful");
//         window.location.reload();
//       } else {
//         alert("Signup failed");
//       }
//     });
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

//       <Form.Group controlId="formEmail">
//         <Form.Label>Email:</Form.Label>
//         <Form.Control
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </Form.Group>

//       <Form.Group controlId="formBirthday">
//         <Form.Label>Birthday:</Form.Label>
//         <Form.Control
//           type="date"
//           value={birthday}
//           onChange={(e) => setBirthday(e.target.value)}
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

export const SignupView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);

        return response.json().then((userData) => {
          if (!response.ok) {
            console.error("Response body:", userData); // Log the response body for error cases
            throw new Error(userData.message || "Signup failed");
          }
          return userData; // Return the parsed user data
        });
      })
      .then((userData) => {
        console.log("Signup response:", userData); // Log the successful response

        // Check if userData has the expected structure
        if (userData && userData.Username) {
          // Save user and token to local storage
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", userData.token);

          // Call onLoggedIn to log the user in directly
          onLoggedIn(userData, userData.token);
          alert("Signup successful");
        } else {
          throw new Error("Invalid response structure");
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Log the error
        alert(`Error: ${error.message}`);
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

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="submit-button">
        Submit
      </Button>
    </Form>
  );
};
