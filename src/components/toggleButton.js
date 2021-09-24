import PropTypes from "prop-types";
import React, { Component } from "react";

import "../styles/toggleButton.css";

export class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { selected, toggleSelected } = this.props;
    let customeStyle;
    switch (selected) {
      case true:
        customeStyle = {backgroundColor: "white"}
        break;
      case false:
        customeStyle = {backgroundColor: ""}
      break;
    
      default:
        break;
    }
    return (
          
      <div className="toggle-container" onClick={toggleSelected} style = {customeStyle}>
        <div className={`dialog-button ${selected ? "" : "disabled"}`}>
          
        </div>
      </div>
    );
  }
}

ToggleButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  toggleSelected: PropTypes.func.isRequired
};