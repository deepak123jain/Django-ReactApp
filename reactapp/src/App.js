import logo from './logo.svg';
import './App.css';
import MainComponent from './component/Login';
import Navheader from './component/header'
import FetchPaper from './component/FetchPaper';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page404 from './component/Page404';

function App() {
  return (
    <div className="App">
      <Navheader />
      <main>
        <Switch>
            <Route path="/" component={MainComponent} exact />
            <Route path="/fetchpapermodule" component={FetchPaper} />
            <Route component={Page404} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
