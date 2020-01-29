import React, { useState } from "react";
import { Form, Label, Input, FormGroup, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FORM_CHANGE } from "../reducers";
import { editMovie } from "../actions";

const UpdateForm = props => {
  const dispatch = useDispatch();
  const movie = useSelector(state => state.movie);
  const [actor, setActor] = useState({ actor: "" });

  const handlesubmit = e => {
    e.preventDefault();
    dispatch(editMovie(movie, props.match.params.id));
    setTimeout(() => {
      props.history.push("/");
    }, 500);
  };

  const handlechange = e => {
    e.preventDefault();
    dispatch({ type: FORM_CHANGE, name: e.target.name, value: e.target.value });
  };

  const actorhandlechange = e => {
    e.preventDefault();
    setActor({ ...actor, [e.target.name]: e.target.value });
  };
  const starchange = e => {
    e.preventDefault();
    dispatch({ type: "STAR_CHANGE", payload: actor.actor });
    setActor({ actor: "" });
  };

  return (
    <div className='updateForm'>
      <Form onSubmit={handlesubmit}>
        <FormGroup>
          <Label>
            <p> Title </p>
            <Input
              type='text'
              name='title'
              value={movie.title}
              placeholder=' title'
              onChange={handlechange}
            />
            {console.log(movie, "movie")}
            {console.log(props, "PROPS")}
          </Label>
          <Label>
            <p> Director </p>
            <Input
              type='text'
              name='director'
              value={movie.director}
              placeholder=' director'
              onChange={handlechange}
            />
          </Label>
          <Label>
            <p> Metascore </p>
            <Input
              type='text'
              name='metascore'
              value={movie.metascore}
              placeholder=' metascore'
              onChange={handlechange}
            />
          </Label>
          <Label>
            <p> Actor </p>
            <Input
              type='text'
              name='actor'
              value={actor.actor}
              placeholder=' stars'
              onChange={actorhandlechange}
            />
          </Label>
          <Button onClick={starchange}>ADD ACTOR</Button>
          <input type='submit' />
        </FormGroup>
      </Form>
    </div>
  );
};

export default UpdateForm;
