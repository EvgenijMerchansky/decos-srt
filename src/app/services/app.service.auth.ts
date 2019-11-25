import { Injectable } from '@angular/core';
import {auth} from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuth {

  constructor(public fsAuth: AngularFireAuth) { }

  public async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.fsAuth.auth.signInWithPopup(provider);

    return credentials.credential !== undefined;
  }
}
