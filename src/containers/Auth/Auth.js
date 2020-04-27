import React, { Component } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Type correct email, please.",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "Type correct password, please.",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {};

  registerHandler = () => {};

  submitHandler = (e) => {
    e.preventDefault();
  };

  onChangeHandler = (event, controlName) => {
    console.log(`${controlName}: `, event.target.value)
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const {
        type,
        value,
        valid,
        touched,
        label,
        validation,
        errorMessage,
      } = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={type}
          value={value}
          valid={valid}
          touched={touched}
          label={label}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
            <Button type="success" onClick={this.loginHandler()}>
              Login
            </Button>
            <Button type="primary" onClick={this.registerHandler()}>
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
