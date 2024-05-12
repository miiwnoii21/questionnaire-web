import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Assignment } from '../../models/assignment/assignment';


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
    const user = this.storageService.getUserAuth();
    httpOptions.headers = httpOptions.headers.set('Authorization',`Bearer ${user?.accessToken}`)
    return this.client.get(QUESTIONNAIRE_API+'/v1/questions/categories', httpOptions);
  }

  getQuestions(categoryId: string): Observable<any>{
    const user = this.storageService.getUserAuth();
    httpOptions.headers = httpOptions.headers.set('Authorization',`Bearer ${user?.accessToken}`)
    return this.client.get(`${QUESTIONNAIRE_API}/v1/questions/categories/${categoryId}`, httpOptions)
  }

  submitAssignment(model: Assignment): Observable<any>{
    const user = this.storageService.getUserAuth();
    httpOptions.headers = httpOptions.headers.set('Authorization',`Bearer ${user?.accessToken}`)
    return this.client.post(QUESTIONNAIRE_API+'/v1/questions/submit-assignment', model, httpOptions)
  }
}
