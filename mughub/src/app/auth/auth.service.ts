import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { SnackBarService } from '../shared/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { Student, Tutor } from '../admin-app/roster/roster.service';

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
            if (user.active == false) {
              this.handleError('auth/user-disabled')
              window.location.reload()
            }
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
    return this.authref.doc(uid).get();
  }

  getUserByUsername(username: string) {
    return this.authref.where("username", '==', username).get()
  }

  editUserCollect(uid, userData) {
    return this.authref
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

  clearUserSession() {
    sessionStorage.clear();
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
          let other = { type: 'student', username: username, active: true }
          this.createUserInFirestore(userObj.user.uid, { ...student, ...other })
            .then(() => Promise.resolve() /* add student to tutor's profile */)
            .catch(error => Promise.reject(error))
        }).catch(error => Promise.reject(error))
      }).catch(error => Promise.reject(error))
  }

  registerTutor(tutor: Tutor) {
    console.log(tutor);
    let base = (tutor.firstName + tutor.lastName).toLowerCase()
    return this.generateUsername(base)
      .then(username => {
        console.log(username)
        this.registerInAuth(username, tutor.password).then(userObj => {
          let other = { type: 'tutor', username: username, active: true }
          this.createUserInFirestore(userObj.user.uid, { ...tutor, ...other })
            .then(() => Promise.resolve())
            .catch(error => Promise.reject(error))
        }).catch(error => Promise.reject(error))
      }).catch(error => Promise.reject(error))
  }

  logout() {
    if (confirm('Are you sure you would like to logout?')) {
      this.clearUserSession()
      firebase.auth().signOut()
    }
  }
}
