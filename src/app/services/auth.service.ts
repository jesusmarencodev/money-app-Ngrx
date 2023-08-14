import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly auth:AngularFireAuth) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=> {
      console.log(fuser);
    })
  }


  createUser(name:string, email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
   return this.auth.signOut()
  }
}
