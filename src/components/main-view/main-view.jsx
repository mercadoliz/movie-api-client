import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";
// #0
import { setMovies } from "../../actions/actions";
// import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

// haven't written this one yet
// import MoviesList from '../movies-list/movies-list';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
// import { UpdateView } from '../update-view/update-view';
import { GenreView } from "../genre-view/genre-view";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import "./main-view.scss";
import { UpdateView } from "../update-view/update-view";
import MoviesList from "../movies-list/movies-list";

class MainView extends React.Component {
  constructor() {
    // call the superclass constructor so react can initialize it
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://myflix-lizmovies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // #1
        this.props.setMovies(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  /* When a movie is clicked this function is invoked and updates the state of the `selectedMovie` *property to that movie */
  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    console.log("logout successful");
    alert("You have been successfully logged out");
    window.open("/", "_self");
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initally loaded
    // const { movies, user } = this.state;

    // #2
    // let { movies, visibilityFilter } = this.props;
    let { movies } = this.props;
    let { user } = this.state;
    /* If there is no user, the LoginView is rendered.  If there is a user logged in, the user details are *passed as a prop to the LoginView */

    // Before the movies have been loaded

    // if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <div className="main-view">
          <Navbar
            expand="lg"
            sticky="top"
            variant="dark"
            expand="lg"
            className="navbar shadow-sm mb-5"
          >
            <Navbar.Brand href="http://localhost:1234" className="navbar-brand">
              FlixNET
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              {/* <VisibilityFilterInput visibilityFilter={visibilityFilter} /> */}
              {!user ? (
                <ul>
                  <Link to={`/`}>
                    <Button variant="link" className="navbar-link">
                      Sign In
                    </Button>
                  </Link>
                  <Link to={`/register`}>
                    <Button variant="link" className="navbar-link">
                      Register
                    </Button>
                  </Link>
                </ul>
              ) : (
                <ul>
                  <Link to={`/`}>
                    <Button
                      variant="link"
                      className="navbar-link"
                      onClick={() => this.logOut()}
                    >
                      Sign Out
                    </Button>
                  </Link>
                  <Link to={`/users/${user}`}>
                    <Button variant="link" className="navbar-link">
                      My Account
                    </Button>
                  </Link>
                  <Link to={`/`}>
                    <Button variant="link" className="navbar-link">
                      Movies
                    </Button>
                  </Link>
                  <Link to={`/about`}>
                    <Button variant="link" className="navbar-link">
                      About
                    </Button>
                  </Link>
                </ul>
              )}
            </Navbar.Collapse>
          </Navbar>

          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              return <MoviesList movies= {movies}/>;
            }}
          />
          {/* return ( */}
          {/* <div className="row d-flex mt-4 ml-2"> */}
          {/* {movies.map(m => <MovieCard key={m._id} movie={m}/> */}
          {/* )} */}
          {/* </div> */}
          <Route path="/register" render={() => <RegistrationView />} />

          <Route
            exact
            path="/users/"
            render={() => window.open("/", "_self")}
          />

          <Route
            exact
            path="/users/:userId"
            render={() => <ProfileView movies={movies} />}
          />

          <Route
            path="/update/:userId"
            render={() => {
              return <UpdateView />;
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />

          <Route
            path="/genres/:name"
            render={({ match }) => (
              <GenreView
                genre={movies.find((m) => m.Genre.Name === match.params.name)}
                movies={movies}
              />
            )}
          />

          <Route
            path="/directors/:name"
            render={({ match }) => (
              <DirectorView
                director={movies.find(
                  (m) => m.Director.Name === match.params.name
                )}
                movies={movies}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

// #3
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

// #4
export default connect(mapStateToProps, { setMovies })(MainView);
