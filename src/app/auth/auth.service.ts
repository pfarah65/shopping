import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Recipe} from '../recipes/recipe.model';
@Injectable()
export class AuthService {
  loginError = new Subject<string>();
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {}
  
  token: string;
  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch( error => console.log(error))
      .then(resp => this.signInUser(email,password));
  }

  signInUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(
        res => {

          this.router.navigate(['/recipes']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(err => this.loginError.next(err.message));

  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated(){
    return this.token != null;
  }

  logout(){
    firebase.auth().signOut();
    this.token = null;
  }
}
