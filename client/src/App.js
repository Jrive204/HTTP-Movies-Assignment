import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import AddMovieForm from "./Movies/AddMovieForm";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);
  const loading = useSelector(state => state.isloading);

  const toggle = () =>
    dispatch({ type: "RESET_FORM" }) &
    setTimeout(() => {
      dispatch({ type: "MODAL" });
    }, 100);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />

      {!loading ? (
        <Button
          onClick={toggle}
          style={{ textAlign: "center", marginLeft: "80%" }}>
          ADD MOVIE
        </Button>
      ) : null}

      <AddMovieForm />

      <Route exact path='/update-movie/:id' component={UpdateForm} />

      <Switch>
        <Route exact path='/' component={MovieList} />

        <Route
          path='/movies/:id'
          render={props => {
            return <Movie {...props} addToSavedList={addToSavedList} />;
          }}
        />
      </Switch>
    </>
  );
};

export default App;
