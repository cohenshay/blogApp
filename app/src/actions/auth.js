// import { firebase, googleAuthProvider } from '../firebase/firebase';

import axios from 'axios';

export const signin = (params) => {
  let data = {
    fname: "shay",
    lname: "cohen",
    address: "hakesem 6 herzeliya",
    email: "cohenshay85@gmail.com",
    username: "cohenshay",
    password: "1234"
  };

  return function (dispatch) {
    axios.post(`http://localhost:5000/auth/signin`, data)
      .then((response) => dispatch({
        type: 'LOGIN',
        uid: response.data.token
      })).catch((err) => console.log(err))
  }
}

