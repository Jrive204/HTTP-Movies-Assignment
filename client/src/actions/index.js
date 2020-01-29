import Axios from "axios";

export const editMovie = (movie, id) => dispatch => {
  dispatch({ type: "DATA_START" });
  Axios.put(`http://localhost:5000/api/movies/${id}`, movie)
    .then(
      res =>
        console.log(res, "moviestuff") &
        dispatch({ type: "DATA_SUCCESS", payload: res.data })
    )
    .catch(
      err =>
        console.log(err, "error") &
        dispatch({ type: "DATA_FAILURE", payload: err })
    );
};

export const deleteMovie = id => dispatch => {
  dispatch({ type: "DATA_START" });
  Axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(
      res =>
        console.log(res, "moviestuff") &
        dispatch({ type: "DATA_SUCCESS", payload: res.data })
    )
    .catch(
      err =>
        console.log(err, "error") &
        dispatch({ type: "DATA_FAILURE", payload: err })
    );
};
