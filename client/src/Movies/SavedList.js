import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "reactstrap";
export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className='saved-list'>
          <h3>Saved Movies:</h3>
          {this.props.list.map(movie => {
            return (
              <NavLink
                to={`/movies/${movie.id}`}
                key={movie.id}
                activeClassName='saved-active'>
                <span className='saved-movie'>{movie.title}</span>
              </NavLink>
            );
          })}
          <div className='home-button'>
            <Link to='/'>Home</Link>
          </div>
        </div>
        <div>
          <Link to='/Add-movie'>
            <Button style={{ textAlign: "center", marginLeft: "80%" }}>
              ADD MOVIE
            </Button>
          </Link>
        </div>
      </>
    );
  }
}
