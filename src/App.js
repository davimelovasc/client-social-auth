import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      user: props.user
    }
  }

  updateUserState = (user) => {
    if(user) {
      console.log(user.getIdTokenResult(false).then(res => console.log(res.token)
      ))
      axios.post('http://devel.unifor.br/uniforplay/api/autenticacao/firebase', {}, 
      { 
        headers: 
        { 
          'firebase-token': user.refreshToken  
        } 
      }).then( res => {
        console.log(res);
        
      })
    }
  }



  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
      signInWithFacebook
    } = this.props;

    return (
      <div className="App">
        {this.updateUserState(user)}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            user
              ? <p>Hello, {user.displayName}</p>
              : <p>Please sign in.</p>
          }

          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGoogle}>Sign in with Google</button>
          }
        </header>
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);