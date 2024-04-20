import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';


const QUESTIONNAIRE_API = 'https://training-homework.calllab.net'
const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})

export class QuestionnaireService {

  constructor(private client: HttpClient, private storageService: StorageService) { }
  
  login(username: string, password: string): Observable<any>{
    return this.client.post(QUESTIONNAIRE_API+'/v1/login', {username,password}, httpOptions)
  }

  getQuestionCategories(): Observable<any>{
    let user = this.storageService.getUserAuth();
    //user?.accessToken
    httpOptions.headers = httpOptions.headers.set('Authorization',`Bearer ${user?.accessToken}`)
    console.log(`httpOptions- ${JSON.stringify(httpOptions.headers)}`)
    return this.client.get(QUESTIONNAIRE_API+'/v1/questions/categories', httpOptions);
  }
}
