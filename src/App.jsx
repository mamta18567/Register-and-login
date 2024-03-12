import { useState, useEffect } from 'react';
import Login from './Login/login';
import Register from './Register/register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(true)
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [welcome, setWelcome] = useState(false)


  const handleRegister = (username, password) => {
    if (registeredUsers.some(user => user.username === username)) {
      alert('Username already exists!');
      return;
    }

    const newUser = { username, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    alert('Registration successful!');
    localStorage.setItem('registered', true);
    setLoggedIn(true);
    setRegistered(false);
  };

  const handleLogin = (username, password) => {
    const user = registeredUsers.find(user => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem('loggedIn', true)
      localStorage.setItem('Name', username);
      setRegistered(false);
      setWelcome(true);
      setLoggedIn(false);
      alert('Login successful!');
    } else {
      alert('Invalid username or password!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setRegistered(true);
    setWelcome(false)
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
  }, []);


  return (
    <>
      <div>
        {registered ? (<Register handleRegister={handleRegister} />) : ""}
        {loggedIn ? (
          <div>
            <Login handleLogin={handleLogin} />
          </div>
        ) : ""}
        {welcome ? ((<div style={{display:"flex", minHeight:"90vh", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
          <h1>Welcome!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>)) : ""}
      </div>
    </>
  )
}

export default App
