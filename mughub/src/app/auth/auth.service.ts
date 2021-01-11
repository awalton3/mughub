import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase'
require('firebase/auth')

export interface User {
  firstName: string,
  lastName: string,
  subjects: Array<string>,
  username: string,
  password: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private db: AngularFirestore) { }

  // register(firstName: string, lastName: string, subjects: Array<string>, username: string, password: string, email: string) {
  //   firebase.auth().createUserWithEmailAndPassword(username + "@placehoder.com", password)
  //     .then(userObj => {
  //       console.log(userObj);
  //       //this.addUserToFbCollect(this.createNewUserObj(userObj, formData))
  //       //this.verifyEmail();
  //     })
  //     .catch(error => console.log(error))
  // }

  register(username, password) {
    return firebase.auth().createUserWithEmailAndPassword(username + "@placehoder.com", password)
  }

  getUserSession() {
    return JSON.parse(sessionStorage.getItem('user'))
  }

  createUserSession(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  editUserCollect(uid, userData) {
    return this.db.collection('/users')
      .doc(uid)
      .set(Object.assign({}, userData))
      // .then(() => {
      //   //this.router.navigate(['/mughub/login']);
      // })
      // .catch(error => console.log(error))
  }

  getUserFromFbCollect(uid: string) {
    return this.db.collection('/users').doc(uid).get();
  }

  // updateUserCollect() {
  //   let user = this.getUserSession();
  //   return this.db.collection('/users')
  //     .doc(user.uid)
  //     .update(user)
  //     // .then(() => this.onSuccess('Profile Successfully Updated'))
  //     // .catch(error => this.onError('An error occurred', error))
  // }

  handleError(errorCode: any) {

    switch (errorCode) {

      //login
      case 'auth/invalid-email':
        //this.onError('Your email is invalid.')
        break;
      case 'auth/user-disabled':
        //this.onError('Your account is disabled.')
        break;
      case 'auth/user-not-found':
        //this.onError('Your email is not registered.')
        break;
      case 'auth/wrong-password':
        //this.onError('Your password is invalid.')
        break;

      //register
      case 'auth/email-already-in-use':
        //this.onError('Email already in use')
        break;
      case 'auth/invalid-email':
        //this.onError('Email address is invalid')
        break;
      case 'auth/operation-not-allowed':
        //this.onError('Operation not allowed');
        break;
      case 'auth/weak-password':
        //this.onError('Password is weak');
        break;

      //reset
      case 'auth/invalid-email':
        //this.onError('Email invalid');
        break;
      case 'auth/user-not-found':
        //this.onError('No user found');
        break;

    }
  }








}
