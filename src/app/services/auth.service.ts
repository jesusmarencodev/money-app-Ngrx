import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription: Subscription;
  private _user: User;
  constructor(
    private readonly auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private store: Store<AppState>
  ) {}
  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.userSubscription = this.fireStore
          .doc(`${fuser.uid}/user`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = User.fromFireStore(firestoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }
  createUser(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user.uid, name, email);
        return this.fireStore.doc(`${user.uid}/user`).set({ ...newUser });
      });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fuser) => fuser != null));
  }
}
