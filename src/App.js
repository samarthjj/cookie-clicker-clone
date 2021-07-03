import { useDispatch, useStore } from 'react-redux';
import { useEffect, useState } from 'react';
import Cookie from './Components/Cookie';
import Store from './Components/Store';
import Upgrades from './Components/Upgrades';
import { motion } from 'framer-motion';
import * as Action from './actionTypes';
import './css/App.css';

let timer = null;
let autosaveTimer = null;
let store = null;
const ONE_SECOND = 1000;

const App = () => {
  store = useStore();
  const dispatch = useDispatch()

  const [gameSaved, setGameSaved] = useState(false);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
      addAfkCookies(dispatch);
    
    } else {
      localStorage.setItem("leaveTime", new Date().getTime());
    }
  });

  const addAfkCookies = (dispatch) => {
    const leaveTime = localStorage.getItem("leaveTime");
    const currentTime = new Date().getTime();
    const afkTime = Math.floor((currentTime - leaveTime)/1000);
  
    const cookieProductionRate = store.getState().cookieProductionRate;
    
    if (localStorage.getItem("cookies") === null) return;
  
    const cookies = parseInt(localStorage.getItem("cookies"));
    const cookiesToAdd = cookieProductionRate * afkTime;
  
    dispatch({
      type: Action.SET_COOKIES,
      payload: cookies + cookiesToAdd
    })
  }

  const start = () => (dispatch) => {
    clearInterval(timer);
    clearInterval(autosaveTimer);
    timer = setInterval(() => dispatch(tick()), ONE_SECOND);
    autosaveTimer = setInterval(() => save(), 60 * ONE_SECOND);
  }

  const tick = () => {
      return { type: Action.AUTO_INCREMENT, payload: {} }   
  }

  const stop = () => {
      clearInterval(timer);
      clearInterval(autosaveTimer);
  }

  const loadSave = (dispatch) => {
    const bakeryName = localStorage.getItem("bakeryName");
    const leaveTime = parseInt(localStorage.getItem("leaveTime"));

    if (bakeryName === undefined || bakeryName === null) return;

    const cookies = parseInt(localStorage.getItem("cookies"));
    const cookieProductionRate = parseFloat(localStorage.getItem("cookieProductionRate"));
    let cookieStore = {};
    
    try {
      cookieStore = JSON.parse(localStorage.getItem("store"));
    
    } catch(error) {
      console.log(error, cookieStore);
      return;
    }

    dispatch({
      type: Action.LOAD_SAVE,
      payload: {
        bakeryName,
        cookies,
        cookieProductionRate,
        store: cookieStore
      }
    });

    if (leaveTime === null) return;
    
    const currentTime = new Date().getTime();
    const difference = Math.floor((currentTime - leaveTime)/1000);
    const cookiesToAdd = cookieProductionRate * difference;

    dispatch({
      type: Action.ADD_COOKIES,
      payload: cookiesToAdd
    })
  }

  const save = () => {
    const state = store.getState();
    const bakeryName = state.bakeryName;
    const cookies = state.cookies;
    const cookieProductionRate = state.cookieProductionRate;
    const cookieStore = state.store;

    localStorage.setItem("bakeryName", bakeryName)
    localStorage.setItem("cookies", cookies)
    localStorage.setItem("cookieProductionRate", cookieProductionRate)
    localStorage.setItem("store", JSON.stringify(cookieStore));

    if (!gameSaved) {
      setGameSaved(true);
      setTimeout(() => setGameSaved(false), 2 * ONE_SECOND)
    }
  }

  useEffect(() => {
    loadSave(dispatch);
    start()(dispatch);

    return () => {
        stop();
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Cookie />
      <Upgrades saveGame={save} />
      <Store />
      {gameSaved && <motion.div className="tt" initial={{y: '110vh', x: 10}} animate={{y: '92vh', x: 10}}>
        Game Saved
      </motion.div>}
    </div>
  );
}

export default App;
