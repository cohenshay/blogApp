import React from 'react';
import { connect } from 'react-redux';
import { signin } from '../actions/auth';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export const LoginPage = ({ signin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Boilerplate</h1>
      <p>Tag line for app.</p>
      <button className="button" onClick={signin}>Login with Google</button>
    </div>   
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  signin: () => dispatch(signin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
