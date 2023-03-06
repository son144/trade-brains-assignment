import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import WatchList from "./pages/watchlist/WatchList";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter className="App">
      <Header />
      <Route path="/">
        <Redirect to="/home" exact />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/watchlist">
        <WatchList />
      </Route>
    </BrowserRouter>
  );
}

export default App;
