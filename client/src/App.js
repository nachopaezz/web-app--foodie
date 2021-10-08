import './App.css';
import PaginationComponent from './Components/RecipesCard/RecipesCard';
import LandingPage from './Components/LandingPage/LandingPage';
import RecipeDetail from './Components/RecipeDetail/RecipeDetail';
import Nav from './Components/Nav/Nav';
import { Route, Switch } from 'react-router-dom';
import CreateRecipe from './Components/CreateRecipe/CreateRecipe';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route>
          <Nav path="/" component={Nav} />
          <Route exact path="/home" component={PaginationComponent} />
          <Route path="/home/:id" component={RecipeDetail} />
          <Route path="/recipe" component={CreateRecipe} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;