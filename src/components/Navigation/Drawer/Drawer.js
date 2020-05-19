import React from "react";
import classes from "./Drawer.module.scss";
import Backdrop from "./../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";

class Drawer extends React.Component {

  clickHandler = () => {
    this.props.onClose();
  }

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer, !this.props.isOpen ? classes.close : null];
    // console.log(this.props, cls);

    const links = this.props.isAuthenticated
      ? [
          { to: "/", label: "List", exact: true },
          { to: "/quiz-creator", label: "Make a quiz", exact: false },
          { to: "/logout", label: "Exit", exact: false },
        ]
      : [
          { to: "/", label: "List", exact: true },
          { to: "/auth", label: "Auth", exact: false },
        ];

    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
