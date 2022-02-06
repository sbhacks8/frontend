import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import axios from "axios";

function App() {
  const {loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently} = useAuth0()

  function callApi() {
    axios
      .get("http://localhost:4000/")
      .then(response => console.log(response.data))
      .catch(error => console.log(error.message))
  }
  async function callProtectedApi() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
    // axios
    //   .get("http://localhost:4000/protected")
    //   .then(response => console.log(response.data))
    //   .catch(error => console.log(error.message))
  }

  return (
    <div className="App">
      <h1>Timely</h1>
      <ul>
        <li>
          <button onClick={loginWithPopup}>Login With Popup</button>
        </li>
        <li>
          <button onClick={loginWithRedirect}>Login With Redirect</button>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
      <p>You are { isAuthenticated ? "Logged in" : "Logged Out"}</p>

      <ul>
        <li><button onClick={callApi}>Call API</button></li>
        <li><button onClick={callProtectedApi}>Call Protected API</button></li>
      </ul>

      { isAuthenticated && (<pre styled={{ textAlign: 'start' }}>{JSON.stringify(user, null, 2)}</pre> )}

      {/* <Router>
        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/detail/:id" element={<Calling />}></Route>
        </Routes>
      </Router> */}
    </div>
  )
};

export default App
