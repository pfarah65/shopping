import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  loginSubscription: Subscription;
  invalid = false;
  errMsg: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginSubscription = this.authService.loginError.subscribe(
      (msg) =>{
      this.invalid = true;
      this.errMsg = msg;
    });
  }
  onSignIn(form: NgForm){
    this.authService.signInUser(
      form.value.email,
      form.value.password
    );
  }
  ngOnDestroy(){
    this.loginSubscription.unsubscribe();
}
}
