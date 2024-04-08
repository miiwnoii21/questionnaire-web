import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const QUESTIONNAIRE_API = 'https://training-homework.calllab.net'
const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})

export class QuestionnaireService {

  constructor(private client: HttpClient) { }
  
  login(username: string, password: string): Observable<any>{
    return this.client.post(QUESTIONNAIRE_API+'/v1/login', {username,password}, httpOptions)
  }
}
