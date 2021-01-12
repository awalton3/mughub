import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { SnackBarService } from '../shared/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { Student } from '../admin-app/roster/roster.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //user = new Subject<any>();
  constructor(
    private snackbarService: SnackBarService,
    private router: Router
  ) {}

  authref = firebase.firestore().collection('/users')

  login(username, password) {
    firebase.auth().signInWithEmailAndPassword(username + "@placeholder.com", password)
      .then(userObj => {
        this.getUserFromFireCollect(userObj.user.uid)
          .then(userData => {
            let user = Object.assign({}, userData.data())
            delete user.password
            this.createUserSession(user)
            this.router.navigate([user.type]);
          }).catch(error => console.log(error))
      }).catch(error => this.handleError(error.code))
  }

  registerInAuth(username, password) {
    return firebase.auth().createUserWithEmailAndPassword(username + "@placeholder.com", password)
  }

  getUserFromFireCollect(uid: string) {
    return firebase.firestore().collection('/users').doc(uid).get();
  }

  getUserByUsername(username: string) {
    return firebase.firestore().collection('/users').where("username", '==', username).get()
  }

  editUserCollect(uid, userData) {
    return firebase.firestore().collection('/users')
      .doc(uid)
      .set(Object.assign({}, userData))
      // .then(() => {
      //   //this.router.navigate(['/mughub/login']);
      // })
      // .catch(error => console.log(error))
  }

  getUserSession() {
    return JSON.parse(sessionStorage.getItem('user'))
  }

  createUserSession(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  handleError(errorCode: any) {

    switch (errorCode) {

      //login
      case 'auth/invalid-email':
        this.onError('Your email is invalid.')
        break;
      case 'auth/user-disabled':
        this.onError('Your account is disabled.')
        break;
      case 'auth/user-not-found':
        this.onError('Your email is not registered.')
        break;
      case 'auth/wrong-password':
        this.onError('Your password is invalid.')
        break;

      //register
      case 'auth/email-already-in-use':
        this.onError('Email already in use')
        break;
      case 'auth/invalid-email':
        this.onError('Email address is invalid')
        break;
      case 'auth/operation-not-allowed':
        this.onError('Operation not allowed');
        break;
      case 'auth/weak-password':
        this.onError('Password is weak');
        break;

      //reset
      case 'auth/invalid-email':
        this.onError('Email invalid');
        break;
      case 'auth/user-not-found':
        this.onError('No user found');
        break;

    }
  }

  onSuccess(message: string) {
    this.snackbarService.onOpenSnackBar.next({ message: message, isError: false });
  }

  onError(message: string) {
    this.snackbarService.onOpenSnackBar.next({ message: message, isError: true });
  }

  getUsersOrderByUsername(name: string) {
    // returns all usernames that startWith input string
    return this.authref.orderBy('username').startAt(name).endAt(name+"\uf8ff").get()
  }

  generateUsername(name: string) {
    return this.getUsersOrderByUsername(name)
      .then(matchedUsers => {

        // No existing users have base username
        if (matchedUsers.docs.length == 0)
          return Promise.resolve(name)

        // Generate unique username from base
        let nums = matchedUsers.docs.map(match => {
          return Number(match.data().username.substring(name.length))
        })
        return Promise.resolve(name + (Math.max(...nums) + 1))
    })
  }

  createUserInFirestore(uid, userData) {
    return this.authref.doc(uid).set(Object.assign({}, userData))
  }

  editUserInFirestore(uid, userData) {
    return this.authref.doc(uid).update(Object.assign({}, userData))
  }

  registerStudent(student: Student) {
    let base = (student.firstName + student.lastName).toLowerCase()
    return this.generateUsername(base)
      .then(username => {
        this.registerInAuth(username, student.password).then(userObj => {
          let other = { type: 'student', username: username }
          this.createUserInFirestore(userObj.user.uid, { ...student, ...other })
            .then(() => Promise.resolve())
            .catch(error => Promise.reject(error))
        }).catch(error => Promise.reject(error))
      }).catch(error => Promise.reject(error))
  }


  // recommendUsername(firstname, lastname) {
  //   let name = firstname + lastname;
  //   return this.rosterService.getStudentsOrderByUsername(name)
  //     .then(matches => {
  //       if (matches.docs.length == 0)
  //         return Promise.resolve(name)
  //       let nums = matches.docs.map(match => {
  //         return Number(match.data().username.substring(name.length))
  //       })
  //       //this.recommendUsername = name + (Math.max(...nums) + 1)
  //       return Promise.resolve(name + (Math.max(...nums) + 1))
  //     }).catch(error => { return Promise.reject() })
  // }
}
