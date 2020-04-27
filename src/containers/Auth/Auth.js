import React, { Component } from "react";
import classes from "./Auth.modules.css";
import Button from "../../components/UI/Button/Button";

class Auth extends Component {

  loginHandler = () => {

  }

  registerHandler = () => {

  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <input type="text" />
          <input type="text" />
          <Button type="success" onClick={this.loginHandler()}>
            Login
          </Button>
          <Button type="primary" onClick={this.registerHandler()}>
            Register
          </Button>
        </div>
      </div>
    );
  }
}

export default Auth;
