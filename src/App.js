import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';

// Import components
import RoomSensors from './components/RoomSensors';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
  }
  componentDidMount() {
    axios.get('http://localhost:8000/api/rooms')
      .then(res => {
        this.setState({ rooms: res.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {
    const { rooms } = this.state;
    console.log(rooms);
    return (
      <Router>
        <div className="App">
          <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <h2>Projekt</h2>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  {rooms.map(r => (
                    <li className="nav-item">
                      <Link className="nav-link" to={`/room/${r.room}`}>{r.room}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </header>
          <div className="container" id="navbarSupportedContent">
            <div className="row">
              <div className="col-md-12">
                <Switch>
                  <Route path="/room/:number" component={RoomSensors} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
};