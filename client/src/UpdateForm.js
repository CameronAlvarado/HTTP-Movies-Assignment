import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = (props) => {
    // console.log(props);

    const initialMovie = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
      };

    const [movie, setMovie] = useState(initialMovie);
    console.log(props);

    const { match, state } = props;
    console.log(state)
    useEffect(() => {
      const id = match.params.id;
      const itemToUpdate = state.find(movie => `${movie.id}` === id);
      if (itemToUpdate) {
        console.log(itemToUpdate);
        setMovie(itemToUpdate);
      }
    }, [match, state]);

    const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${movie.id}`, movie) // .put is for updating data, .post is for new data.
          .then(res => {
            console.log(res.data);
            // props.updateMovies(res.data);
            props.history.goBack(`/movie-list/`);
            setMovie(initialMovie);
          })
          .catch(err => console.log(err.response));
      };

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        // if (ev.target.stars === null) {
        //     value = [];
        //   }
    
        setMovie({
          ...movie,
          [ev.target.name]: value
        });
      };

    return (
        <div className="form">
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
                />
                <div className="baseline" />

                <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
                />
                <div className="baseline" />

                <input
                type="string"
                name="metascore"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
                />
                <div className="baseline" />

                <input
                type="string"
                name="stars"
                onChange={changeHandler}
                placeholder="stars"
                value={movie.stars}
                />
                <div className="baseline" />

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    )
};

export default UpdateForm;