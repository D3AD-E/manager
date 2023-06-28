import "./App.css";
import Router from "./components/router";
import store from './redux/store'; 

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
