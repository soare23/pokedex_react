import './App.css';
import Navbar from './components/Navbar';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import TypeList from './components/TypeList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        <Navbar></Navbar>
        <Route path="/pokemons" exact component={PokemonList}></Route>
        <Route path="/type" component={TypeList}></Route>
        <Route path="/pokemons/:name" component={PokemonDetail}></Route>
      </div>
    </Router>
  );
}

export default App;
