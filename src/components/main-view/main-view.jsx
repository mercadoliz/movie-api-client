import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DirectorView } from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view'
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';

class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: [],
      selectedMovie: "",
      user: ""
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-lizmovies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }



  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    return (
      <Container>
        <Router>
          <div className="main-view">
            <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            <Route path="/register" render={() => <RegistrationView />} />
            <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
            <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.name)} movies={movies}/>
            }
            } />
            <Route path="/genres/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name)} movies={movies}/>
            }
            } />
          </div>
        </Router>
      </Container>
    );
  }
}
let mapStateToProps = state => {
  return { movies: state.movies }
}
export default connect(mapStateToProps, { setMovies } )(MainView);
