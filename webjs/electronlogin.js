const socket= io('http://localhost:4100');
socket.on('connect',()=>{
    console.log('connected to localServer')
})

socket.on('loginSuccess',()=>{
  document.querySelector('.one-tap-signinB').innerHTML=`<p class='declareP'><img src="images/checkmark.svg">Login Successful</p> <p class='msgP'>Now you can close this window</p>`
})
socket.on('loginFail',()=>{
  document.querySelector('.one-tap-signinB').innerHTML=`<p class='undeclareP'><img src="images/crossmark.svg">Login Unsuccessful</p> <p class='msgP'>Now you can close this window</p>`
})


function handleCredentialResponse(response) {
    socket.emit('sendLogin',response)
    // const responsePayload = decodeJwtResponse(response.credential);
    const responsePayload=parseJwt(response.credential)
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    console.log("Encoded JWT ID token: " + response.credential);
  }
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
window.onload = function () {

        google.accounts.id.initialize({
            client_id: "613459978793-siulbcg86o106re849evbjosagsgirp3.apps.googleusercontent.com", // Replace with your Google Client ID
            callback: handleCredentialResponse,
            context: "use",
            "data-itp_support":"true" // We choose to handle the callback in client side, so we include a reference to a function that will handle the response
          });
          // You can skip the next instruction if you don't want to show the "Sign-in" button
          google.accounts.id.renderButton(
            document.querySelector(".one-tap-signinB"), // Ensure the element exist and it is a div to display correcctly
            {theme: "filled_black", size: "large", style:"position: absolute; top: 100px; left: 30px;width: 0; height: 0; z-index: 1001;" }  // Customization attributes
          );
          google.accounts.id.prompt();
     // Display the One Tap dialog
  }

  function signOut(){
      localStorage.clear();
      window.location.href='index.html'
  }
