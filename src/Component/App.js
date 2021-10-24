import React, { useEffect, useState } from 'react'
import RouterApp from 'Component/Router';
import { AuthService } from 'firebaseInstance';

function App() {
  const [init, setInit] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
      AuthService.onAuthStateChanged((user) => {
          if (user){
              setIsSignIn(true)
          }else{
              setIsSignIn(false)
          }
          setInit(true)
      })
  }, [])

  return (
    <>
      {init ? <RouterApp isSignIn={isSignIn} /> : "Loading..."}
      <footer>&copy; tw-clone {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
