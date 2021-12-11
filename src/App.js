import "./App.css";
import axios from "axios";
import GoogleLogin from "react-google-login";
function App() {
  const successResponseGoogle = async (response) => {
    console.log(response);
    const token = response.tokenId;
    // console.log(token);
    const result = await axios.post("http://localhost:4000/googleSignIn", {
      token,
    });
    // .then((result) =>
    console.log(result.data.result.email, "hi this is from backend");
    // )
    // .then((err) => console.log(err, "hi this is from backend"));
    // const result = await axios.get("http://localhost:4000/googleSignIn");
  };
  const errorResponseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <div
          className="g-signin2"
          data-onsuccess="onSignIn"
        ></div> */}
        {/* default code to login with google */}
        <GoogleLogin
          clientId="389990397434-ap6i1btg0ubfc79meg74hrt23msjf8ua.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={successResponseGoogle}
          onFailure={errorResponseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </header>
    </div>
  );
}

export default App;
