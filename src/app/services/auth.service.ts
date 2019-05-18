import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router, private database: AngularFirestore) { }

  getUser() {
  	return this.auth.auth.currentUser;
  }

  isAuthenticated() {
  	return this.auth.auth.currentUser !== null;
  }

  createUserEmail(email: string, password: string, name:string) {
  	this.auth.auth.createUserWithEmailAndPassword(email, password).
  	then(user => {
  		console.log(user);
  		const uid = user.user.uid;
  		this.database.collection('users').doc(uid).set({
  		  			uid: uid,
  		  			name: name,
  		  			email: email
  		  			}).then(() => console.log("user created succefuly"))
  						.catch(err => console.log(err.message));
  		this.router.navigate(["/home"]);
  	})
  	.catch(err => console.log(err.message));
  }

  loginUserEmail(email: string, password: string){
  	this.auth.auth.signInWithEmailAndPassword(email, password).then(user=>{
  		console.log(user.user.email);
  		this.router.navigate(["/home"]);})
  		.catch(err => console.log(err.message));
  }

  logout() {
  	this.auth.auth.signOut().
  	then(() => {
  		console.log("Logout Succefully");
  		this.router.navigate(['/login']);
  	})
  	.catch(err => console.log(err.message));
  }
}
