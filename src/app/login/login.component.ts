import { Component } from '@angular/core';
import { LoginForm } from '../models/login-form/login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new LoginForm();

  onSubmit(){
    const {username, password} = this.form
    console.log("submit")
    console.log("username: " + username)
    console.log("pass: " + password)
  }
}
