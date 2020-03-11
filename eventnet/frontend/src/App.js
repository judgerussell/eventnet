import  React, { Component } from  'react';
import { BrowserRouter } from  'react-router-dom';
import { Route, Link } from  'react-router-dom';
import ArtistCreateUpdate from './components/ArtistCreateUpdate';
import ArtistList from './components/ArtistList';
import  './App.css';

const BaseLayout = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href='/#'>EVENTNET</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"  aria-controls="navbarNavAltMarkup"  aria-expanded="false"  aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="/artists">ARTISTS</a>
          <a className="nav-item nav-link" href="/create-artists">CREATE ARTIST</a>
        </div>
      </div>
    </nav>

    <div className="content">
      <Route path="/artists" exact component={ArtistList} />
      <Route path="/artist/:id" exact component={ArtistCreateUpdate} />
      <Route path="/create-artists" exact component={ArtistCreateUpdate} />
    </div>

  </div>
)

function App() {
  return (
    <BrowserRouter>
      <BaseLayout/>
    </BrowserRouter>
  );
}

export default App;
