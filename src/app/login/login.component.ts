import { Component } from '@angular/core';
import { LoginForm } from '../models/login-form/login-form';
import { QuestionnaireService } from '../services/questionnaire/questionnaire.service';
import { LoginResponse } from '../models/login-response/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new LoginForm();

  constructor(private questionnaireService: QuestionnaireService){}

  onSubmit(){
    const {username, password} = this.form
    console.log("submit")
    console.log("username: " + username)
    console.log("pass: " + password)
    this.questionnaireService.login(username, password).subscribe({
      next: (data) => {
        console.log("data");
        console.log(data);
        if(data.isSuccess){
          console.log("accestoken: " + data.data.accessToken);
          
        }
      },
      error: (err) => {
        console.log("err");
        console.log(err);
      }
    });
  }
}
