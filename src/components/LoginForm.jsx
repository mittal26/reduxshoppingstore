import React from "react";
import Joi from "joi-browser";
import Form from "./../common/form";
//import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import { getUser, login } from "../store/users";
import { connect } from "react-redux";

class LoginForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", password: "" },
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.getUser() === null) return <Redirect to="/" />;
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //Call Server
    try {
      //console.log("Submitted");
      const { data } = this.state;
      // await auth.login(data.username, data.password);
      this.props.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <h1>Login</h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.entities.items.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
