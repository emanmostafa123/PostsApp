import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore , AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any 
  constructor(
    public afs:AngularFirestore,
    public afAuth:AngularFireAuth,
    public router:Router,
    public ngZone:NgZone,
  ) { 


    // save data
    this.afAuth.authState.subscribe((user)=>{
      if(user){
        this.userData = user
        localStorage.setItem('user',JSON.stringify(this.userData))
      } else {
        localStorage.setItem('user','null')
        JSON.parse(localStorage.getItem('user')!)
      }
    })
  }

    async SignIn(email: string, password: string) {
      try {
        const result = await this.afAuth
          .signInWithEmailAndPassword(email, password);
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      } catch (error) {
        window.alert(error);
      }
    }

    async SignUp(email: string, password: string) {
      try {
        const result = await this.afAuth
          .createUserWithEmailAndPassword(email, password);
        this.SendVerificationMail();
        this.SetUserData(result.user);
      } catch (error) {
        window.alert(error);
      }
    }

    async SendVerificationMail() {
      return this.afAuth.currentUser
        .then((u: any) => u.sendEmailVerification())
        .then(() => {
          this.router.navigate(['verify']);
        });
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user !== null && user.emailVerified !== false ? true : false;
    }


    async AuthLogin(provider: any) {
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
          this.SetUserData(result.user);
        })
        .catch((error) => {
          window.alert(error);
        });
    }

    SetUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      const userData: User = {
        displayName : user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,

      };
      return userRef.set(userData, {
        merge: true,
      });
    }


    async SignOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['signin']);
      });
    }

}
