import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Recipe} from '../recipes/recipe.model';
import {MessageService} from 'primeng/api';

@Injectable()
export class AuthService {
  loginError = new Subject<string>();
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private messageService: MessageService
              ) {}
  
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
              (token: string) => {
                this.token = token;
                this.messageService.add({severity:'success', summary: 'Welcome!', detail:`Hello 
                ${firebase.auth().currentUser.email}`});
              }
            );
        }
      )
      .catch(err => this.loginError.next(err.message));

  }

  hasToken(token: string){
    this.token = token;
    this.router.navigate(['/recipes']);
    this.messageService.add({severity:'success', summary: 'Welcome!', detail:`Hello 
                ${firebase.auth().currentUser.email}`});

  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated(){
    return this.token != null;
  }

  getUser() {
    return firebase.auth().currentUser.uid.toString();
  }

  logout() {
    firebase.auth().signOut();
    this.messageService.add({severity:'success', summary: 'Logout', detail:'Logged out!'});
    this.token = null;
  }
}
