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

  updateSession(sessionData, sessionId) {
    sessionsRef.doc(sessionId).update(sessionData)
      .then(() => this.snackbarService.onSuccess('Tutoring session was successfully updated'))
      .catch(()=> this.snackbarService.onError('An Error Occurred'))
  }

  getSessions(tutorUsername) {
    return new Observable(observer => {
      sessionsRef
        .where("tutorUsername", "==", tutorUsername)
        .orderBy("date", 'desc')
        .onSnapshot(querySnapshot => {
          let sessions = []
          querySnapshot.forEach(doc => {
            //reformat date
            let original = new Date( (doc.data().date.seconds) * 1000 )
            let newDate = new Date( original.getFullYear(), original.getMonth(), original.getDate(), 0, 0, 0)
            let other = {id: doc.id, generalDate: newDate }
            sessions.push({...doc.data(), ...other})
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
