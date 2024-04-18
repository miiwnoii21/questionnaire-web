import { Component } from '@angular/core';
import { LoginForm } from '../models/login-form/login-form';
import { QuestionnaireService } from '../services/questionnaire/questionnaire.service';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new LoginForm();

  constructor(private questionnaireService: QuestionnaireService, 
    private storageService: StorageService,
    private router: Router){}

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
          console.log("data.expire: " + data.data.expiredDate);
          //var userInfo: UserAuth = data.data;
          //this.storageService.getUserAuth();
          //this.storageService.saveUserAuth(userInfo);
          this.storageService.saveUserAuth(data.data);
          this.router.navigate(['/question-list'])
        }
      },
      error: (err) => {
        console.log("err");
        console.log(err);
      }
    });
  }
}
