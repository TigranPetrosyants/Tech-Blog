import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { User as fireUser } from 'node_modules/@firebase/auth/dist/auth-public';
import { switchMap, takeUntil } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  user$: Observable<User>;
  user: User;

  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = auth.authState.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  loginWithGoogle() {
    const authicate = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(authicate, provider)
      .then((result) => {
        this.updateUser(result.user);
        this.user$.subscribe((user) => {
          if (user?.roles.admin) {
            this.user = user;
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        });
      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          return;
        }
      });
  }

  SignUp(email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUser(result.user);
        this.user$.subscribe((user) => {
          if (user?.roles.admin) {
            this.user = user;
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        });
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }

  SignIn(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUser(result.user);
        this.user$.subscribe((user) => {
          if (user?.roles.admin) {
            this.user = user;
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        });
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          this.SignUp(email, password);
          return;
        }
      });
  }

  updateUser(user: fireUser) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ? user.displayName : user.email,
      photoURL: user.photoURL
        ? user.photoURL
        : 'https://www.w3schools.com/w3images/avatar2.png',
      roles: {
        subscriber: true,
        admin: true,
      },
    };
    userRef.set(data, { merge: true }).catch((err) => console.log(err));
  }

  logout() {
    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
