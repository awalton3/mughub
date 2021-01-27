import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminAppService {

  constructor() { }

  addResource(gradeCategory: string, resourceData) {
    return firebase.firestore().collection(gradeCategory + 'resource')
      .add(resourceData)
  }

}
