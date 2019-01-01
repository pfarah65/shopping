import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {

  }
  ngDoCheck(){
    if(firebase.auth().currentUser !== null){
      firebase.auth().currentUser.getIdToken().then( (token) =>{
        console.log('peter');
        this.authService.hasToken(token);

      });
    }
  }

}
