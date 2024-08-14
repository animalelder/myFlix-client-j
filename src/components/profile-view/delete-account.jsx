// import React from "react";
// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// export const ProfileDelete = ({ user, setUser, token }) => {
//   const navigate = useNavigate(); // Hook for navigating to other routes

//   const handleDeleteAccount = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete your account? This action cannot be undone."
//     );

//     if (!confirmDelete) {
//       return; // Exit the function if the user cancels the deletion
//     }

//     try {
//       const response = await fetch(
//         `https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${user.Username}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         const errorDetails = await response.json();
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // If deletion is successful
//       alert("Your account has been deleted.");
//       localStorage.clear(); // Clear local storage
//       // Reset the user state (you might need to pass a function to do this)
//       setUser(null);
//       navigate("/"); // Redirect to the home page or login page
//     } catch (error) {
//       console.error("Error deleting account:", error);
//       alert("There was an error deleting your account. Please try again later.");
//     }
//   };

//   return (
//     <Button variant="danger" onClick={handleDeleteAccount}>
//       Delete Account
//     </Button>
//   );
// };




import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProfileDelete = ({ user, setUser, token }) => {
  const navigate = useNavigate(); // Hook for navigating to other routes

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) {
      return; // Exit the function if the user cancels the deletion
    }

    console.log("User:", user);
    console.log("Token:", token);

    try {
      const response = await fetch(
        `https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${user.Username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error details:", errorDetails); // Log error details
        throw new Error(`HTTP error! status: ${response.status} - ${errorDetails.message || ''}`);
      }
      
      // If deletion is successful
      alert("Your account has been deleted.");
      localStorage.clear(); // Clear local storage
      // Reset the user state (you might need to pass a function to do this)
      setUser(null);
      navigate("/"); // Redirect to the home page or login page
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("There was an error deleting your account. Please try again later.");
    }
  };

  return (
    <Button variant="danger" onClick={handleDeleteAccount}>
      Delete Account
    </Button>
  );
};
