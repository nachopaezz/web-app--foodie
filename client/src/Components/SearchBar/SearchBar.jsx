import React from 'react'
import { getByName } from '../../actions/index';
import { useState } from "react"
import { connect } from 'react-redux';
import "./SearchBar.css";

function SearchBar(props) {
  const [name, setName] = useState("");
  function handleChange(event) {
    setName(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    props.getByName(name)
    setName("")
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)} >
      <div className="buttonIn">
        <div>
          <input
            type="text"
            id="title"
            placeholder="Search your recipe!"
            autoComplete="off"
            value={name}
            onChange={(e) => handleChange(e)}
            className="Busqueda"
          />
        </div>
        <button type="submit" className="searchButton">🔍</button>
      </div>
    </form>
  )
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getByName: name => dispatch(getByName(name))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)