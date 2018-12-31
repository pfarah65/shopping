import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  invalidMatch = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSignUp(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    const passwordAgain = form.value.passwordAgain;
    if(password === passwordAgain){

      console.log(password);
      this.authService.signupUser(email, password);
    }else{
      this.invalidMatch = true;
    }
  }
}
