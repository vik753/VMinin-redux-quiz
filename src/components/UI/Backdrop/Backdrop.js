import React from "react";
import classes from "./Backdrop.module.scss";

class Backdrop extends React.Component {
  state = {
    cls: [classes.Backdrop],
  };

  componentDidMount() {
    const timeout = setTimeout(() => {
      this.setState({
        cls: [...this.state.cls, classes.open],
      });
      window.clearTimeout(timeout);
    }, 0);
  }

  render() {
    return (
      <div
        className={this.state.cls.join(" ")}
        onClick={this.props.onClick}
      ></div>
    );
  }
}

export default Backdrop;
