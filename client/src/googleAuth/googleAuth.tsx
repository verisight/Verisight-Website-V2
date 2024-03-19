import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

declare const google: any;

interface GoogleSignInButtonProps {
  clientId: string;
}

function googleAuth({ clientId }: GoogleSignInButtonProps) {
  function handleCallbackResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    const decoded = jwtDecode(response.credential);
    console.log("Decoded JWT ID token: ", decoded);

    // Send the JWT token to your backend
    axios
      .post(
        "http://localhost:3000/users/",
        {},
        {
          headers: {
            Authorization: `Bearer ${response.credential}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.headers);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    //google.accounts.id.prompt(); one tap  has fdcem issue  cuz browser cana llow only one identity authentication
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
}

export default googleAuth;
