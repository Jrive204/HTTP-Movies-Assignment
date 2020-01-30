import React, { useState } from "react";
import {
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  Card,
  CardTitle
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FORM_CHANGE } from "../reducers";
import { addMovie } from "../actions";

const uuidv4 = require("uuid/v4");

const AddMovieForm = props => {
  const dispatch = useDispatch();
  const movie = useSelector(state => state.movie);
  const [actor, setActor] = useState({ actor: "" });

  const handlesubmit = e => {
    e.preventDefault();
    dispatch(addMovie(movie));
    dispatch({ type: "RESET_FORM" });
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
        <h1>Add Movie</h1>
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
          <Button
            color='info'
            size='sm'
            style={{ marginLeft: "5%" }}
            onClick={starchange}>
            ADD <br /> ACTOR
          </Button>
          <br />
          <br />
          <div>
            <Button
              size='lg'
              color='primary'
              type='submit'
              style={{ marginLeft: "18%" }}>
              SUBMIT
            </Button>
          </div>
        </FormGroup>
      </Form>

      <div className='actor'>
        <h2 style={{ width: "100%" }}>Stars</h2>
        <br />
        {movie.stars.map((ele, i) => (
          <Card key={uuidv4()} body outline color='warning'>
            <CardTitle>
              {console.log(ele, "ele")}
              <h2>{ele}</h2>
            </CardTitle>

            <Button
              onClick={() => dispatch({ type: "DELETE", payload: i })}
              style={{ width: "50%" }}
              size='sm'
              color='danger'>
              DELETE
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddMovieForm;
