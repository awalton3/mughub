import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Observable, Subject } from 'rxjs';
// import { map } from 'rxjs/operators';


const usersRef = firebase.firestore().collection('/users')
const resourceRef = firebase.firestore().collection('/resources')

export interface Student {
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  subjects: Array<{ subject: string, tutor: string }>,
  email: string
}

@Injectable({
  providedIn: 'root'
})

export class RosterService {

  constructor() {}

  onEditStudent = new Subject<Student>();

  getStudents() {
    return new Observable(observer => {
      const unsubscribe = usersRef.where("type", "==", "student").onSnapshot(querySnapshot => {
        let students = []
        querySnapshot.forEach(doc => students.push(doc.data()))
        observer.next(students)
      })
      return () => { unsubscribe(); }
    })
  }

  getStudentsOrderByUsername(name: string) {
    return usersRef.orderBy('username').startAt(name).endAt(name+"\uf8ff").get()
  }

  // getResources(group: string) {
  //   return new Observable(observer => {
  //     const unsubscribe = resourceRef.where("group", "==", group).onSnapshot(querySnapshot => {
  //     let students = []
  //     querySnapshot.forEach(doc => students.push(doc.data()))
  //     observer.next(students)
  //   })
  //   return () => { unsubscribe(); }
  // }

}
