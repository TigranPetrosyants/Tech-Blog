import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from 'rxjs';
import * as firebase from 'firebase/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    public auth: AngularFireAuth
  ) { 
    this.user$ = auth.authState;
  }

  loginWithGoogle() {
    const provider = new firebase.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  }

  logout() {
    this.auth.signOut();
  }
}
