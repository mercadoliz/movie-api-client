// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { Link } from "react-router-dom";


// export class MovieCard extends React.Component {
//   render() {
//     const { movie, onClick } = this.props;

//     return (
//       <Card style={{ width: '16rem' }}>
//         <Card.Img variant="top" src={movie.ImagePath} />
//         <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//           <Card.Text>{movie.Description.substring(0,20)}...</Card.Text>
//           <Link to={`/movies/${movie._id}`}>
//             <Button variant="link">Open</Button>
//           </Link>        </Card.Body>
//       </Card>
//     );
//   }
// }

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string
//   }).isRequired,
// };

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    if (movie === undefined) return <div></div>;
    return (
      <Link to={`/movies/${movie.Title}`}>
        <Card>
          <Card.Img
            className='movieCard-img'
            variant='top'
            src={movie.ImagePath}
            alt={`${movie.Title} Image`}
          />
          <Card.Body className='movieCard-cardBody'>
            <Card.Title className='movieCard-title'>{movie.Title}</Card.Title>
            <Card.Text className='detailInfo'>{movie.Genre.Name}</Card.Text>
            <Card.Text className='detailInfo'>{movie.RunTime}</Card.Text>
            <Card.Text className='detailInfo'>
              {movie.IMDbRating} out of 10
            </Card.Text>
            <Card.Text className='movieCard-description'>
              {movie.Description.slice(0, 100)}...
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    RunTime: PropTypes.string,
    IMDbRating: PropTypes.string,
  }).isRequired,
};
