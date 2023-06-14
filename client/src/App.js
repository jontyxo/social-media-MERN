import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom"
import LoginPage from "./scenes/loginPage/loginPage";
import Homepage from "./scenes/homePage/homepage";
import ProfilePage from "./scenes/profilePage/profilePage";
import {useEffect, useMemo, useState} from "react"
import {useSelector} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"
import {themeSettings} from "./theme"
import "./App.css"

function App() {
  const [isServerRunning, setIsServerRunning] = useState(true);

useEffect(() => {
  const checkServerStatus = async () => {
    try {
      const response = await fetch("https://social-media-server-6joo.onrender.com/api/check-server-status");
      if (response.status === 200) {
        setIsServerRunning(true);
      } else {
        setIsServerRunning(false);
      }
    } catch (error) {
      setIsServerRunning(false);
    }
  };
console.log(isServerRunning)
  checkServerStatus();
}, []);
  const mode=useSelector((state)=>state.mode)
  const theme =useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  const isAuth=Boolean(useSelector((state)=>state.token));
  
  return (
      <div className="App">
      {!isServerRunning && <p className="serverError">Server not running at this moment. <br /> I am using free service to host the server which turns off the server after being idle for sometime, please try refreshing the page after a minute.</p>}
    {isServerRunning && 

     <BrowserRouter>
     <ThemeProvider theme={theme}>
<CssBaseline />
      <Routes>
        <Route path="/" element={isAuth?<Navigate to="/home"/>:<LoginPage />}/>
        {console.log(isAuth)}
        <Route path="/home" element={isAuth ?<Homepage />:<Navigate to="/"/>}/>
        <Route path="profile/:userId" element={isAuth ?<ProfilePage />:<Navigate to="/"/>}/>
      </Routes>
     </ThemeProvider>
     </BrowserRouter>
    }
    </div>

  );
}

export default App;
