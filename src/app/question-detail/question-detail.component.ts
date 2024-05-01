import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../models/question/question';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrl: './question-detail.component.css'
})
export class QuestionDetailComponent {
  // @Input() form!: FormGroup;
  @Input() question!: Question;

  onSubmit(){
    console.log('app-question-detail: submit')
    // console.log(JSON.stringify(this.form.value))
  }



}
