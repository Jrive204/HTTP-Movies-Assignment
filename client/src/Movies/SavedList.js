import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { StartLoading } from "../actions";

class SavedList extends Component {
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
            <Link onClick={() => this.props.StartLoading()} to='/'>
              Home
            </Link>
          </div>
        </div>
        <div></div>
      </>
    );
  }
}
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { StartLoading })(SavedList);
