import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

declare const google: any;

interface GoogleSignInButtonProps {
  clientId: string;
}

function googleAuth({ clientId }: GoogleSignInButtonProps) {
  function handleCallbackResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    const decoded = jwtDecode(response.credential);
    console.log("Decoded JWT ID token: ", decoded);
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
