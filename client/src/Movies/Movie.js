import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { connect } from "react-redux";
import { deleteMovie, keepEditfields, StopLoading } from "../actions";
class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

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
      <div className='save-wrapper'>
        <MovieCard movie={this.state.movie} />
        <div className='save-button' onClick={this.saveMovie}>
          Save
        </div>
        <div
          className='save-button Edit-button'
          onClick={() =>
            this.props.keepEditfields(
              this.state.movie.id,
              this.state.movie.title,
              this.state.movie.director,
              this.state.movie.metascore,
              this.state.movie.stars
            ) &
            this.props.history.push(
              `/update-movie/${this.props.match.params.id}`
            ) &
            this.props.StopLoading()
          }>
          {console.log(this.state.movie.director, "movies")}
          Edit
        </div>

        <div
          className='save-button Delete-button'
          onClick={() =>
            this.props.deleteMovie(this.props.match.params.id) &
            setTimeout(() => {
              this.props.history.push("/");
            }, 500)
          }>
          Delete
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  StopLoading,
  deleteMovie,
  keepEditfields
})(Movie);
