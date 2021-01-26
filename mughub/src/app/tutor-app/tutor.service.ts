import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { SnackBarService } from '../shared/snack-bar/snack-bar.service';
import { Observable, Subject } from 'rxjs';

const sessionsRef = firebase.firestore().collection('/sessions')
const usersRef = firebase.firestore().collection('/users')

interface session {

}

@Injectable({
  providedIn: 'root'
})

export class TutorService {

  onEditSession = new Subject<any>();

  constructor(private snackbarService: SnackBarService) { }

  submitSession(sessionData) {
    sessionsRef.add(sessionData)
      .then(() => this.snackbarService.onSuccess('Tutoring session was successfully recorded'))
      .catch(()=> this.snackbarService.onError('An Error Occurred'))
  }

  getSessions(tutorUsername) {
    return new Observable(observer => {
      sessionsRef
        .where("tutorUsername", "==", tutorUsername)
        .onSnapshot(querySnapshot => {
          let sessions = []
          querySnapshot.forEach(doc => {
            let docId = {id: doc.id}
            sessions.push({...doc.data(), ...docId})
          })
          observer.next(sessions)
        })
    })
  }

  deleteSession(sessionId) {
    return sessionsRef.doc(sessionId).delete()
      .then(() => this.snackbarService.onSuccess('Session Successfully Deleted'))
      .catch(error => this.snackbarService.onError('Session could not be deleted. Try again.'))
  }

  // getStudents(tutorUsername) {
  //   // return new Observable(observer => {
  //   //   usersRef
  //   //     .where("username", "==", tutorUsername)
  //   // })
  //   usersRef.get()
  // }

}
