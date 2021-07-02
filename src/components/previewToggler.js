import PropTypes from "prop-types";
import React, { Component } from "react";

import "../styles/previewToggler.css";

export default class TogglePreviewButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { selected, toggleSelected } = this.props;
    return (
      <div className="container-toggle" onClick={toggleSelected}>
        <div className={`button-dialog ${selected ? "" : "disabled-div"}`}>
          {selected ? "AR" : "OBJECT"}
        </div>
      </div>
    );
  }
}

TogglePreviewButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  toggleSelected: PropTypes.func.isRequired
};