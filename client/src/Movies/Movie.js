import React from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateForm from '../UpdateForm';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.props.match.params.id !== newProps.match.params.id) {
  //     this.fetchMovie(newProps.match.params.id);
  //   }
  // }

  // deleteMovie = props => {
  //   axios
  //   .delete(`http://localhost:5000/api/movies/${props.state.id}`)
  //   .then(res => {
  //     console.log(res);
  //     return this.setState({ movie: res.data })
  //   })
  //   .catch(err => console.log(err.response))
  // }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="new-route-button">
          <Link to={`/update-movie/${this.state.movie.id}`}>
            Edit/Delete
          </Link>
        </div>
        {/* <button className="delete" onClick={this.deleteMovie}>Delete</button> */}
      </div>
    );
  }
}
