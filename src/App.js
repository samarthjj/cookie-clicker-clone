import { useDispatch, useStore } from 'react-redux';
import { useEffect } from 'react';
import Cookie from './Components/Cookie';
import Store from './Components/Store';
import { useBeforeunload } from 'react-beforeunload';
import * as Action from './actionTypes';
import './css/App.css';

let timer = null;
let autosaveTimer = null;
let store = null;
const ONE_SECOND = 1000;

const start = () => (dispatch) => {
    clearInterval(timer);
    clearInterval(autosaveTimer);
    timer = setInterval(() => dispatch(tick()), ONE_SECOND);
    autosaveTimer = setInterval(() => autosave(), 30 * ONE_SECOND);
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
  })
}

const autosave = () => {
  const state = store.getState();
  const bakeryName = state.bakeryName;
  const cookies = state.cookies;
  const cookieProductionRate = state.cookieProductionRate;
  const cookieStore = state.store;

  localStorage.setItem("bakeryName", bakeryName)
  localStorage.setItem("cookies", cookies)
  localStorage.setItem("cookieProductionRate", cookieProductionRate)
  localStorage.setItem("store", JSON.stringify(cookieStore));
}

const App = () => {
  store = useStore();
  const dispatch = useDispatch()

  useEffect(() => {
    loadSave(dispatch);
    start()(dispatch);

    return () => {
        stop();
    }
  }, []);

  return (
    <div className="App">
      <Cookie />
      <Store />
    </div>
  );
}

export default App;
