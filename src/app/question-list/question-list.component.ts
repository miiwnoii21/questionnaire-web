import { Component } from '@angular/core';
import { QuestionnaireService } from '../services/questionnaire/questionnaire.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionCategoryDetail } from '../models/question-category-detail/question-category-detail';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Assignment,
  AssignmentAnswer,
  AssignmentQuestion,
} from '../models/assignment/assignment';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css',
})
export class QuestionListComponent {
  questionCategoryDetail: QuestionCategoryDetail = new QuestionCategoryDetail();
  submitedAssignment: Assignment = new Assignment();
  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    console.log('test');
    const categoryId = this.route.snapshot.queryParamMap.get('category') ?? '';
    console.log(JSON.stringify(categoryId));
    this.questionnaireService.getQuestions(categoryId).subscribe({
      next: (response) => {
        console.log('getQuestions', response);
        if (response.isSuccess) {
          this.questionCategoryDetail = response.data;
          this.questionCategoryDetail.questionInfo =
            this.questionCategoryDetail.questionInfo.map((question) => {
              return {
                ...question,
                formGroup: this.formBuilder.group({
                  [`${question.questionId}-formCtrl`]: [
                    '',
                    Validators.required,
                  ],
                }),
              };
            });

          console.log(
            'this.questionCategoryDetail',
            this.questionCategoryDetail
          );

          this.submitedAssignment.questionCategoryId = categoryId;
          this.questionCategoryDetail.questionInfo.forEach((question) => {
            this.submitedAssignment.questions.push({
              questionId: question.questionId,
              answers: [],
            });
          });
        }
      },
    });
  }
  onSubmit() {
    console.log(
      'submit---', this.submitedAssignment)
      this.questionnaireService.submitAssignment(this.submitedAssignment).subscribe({
        next: (response) => {
          console.log('submit', response);
          if(response.isSuccess){
            console.log('score: ' + response.data.score)
          }
        }
      });
  }

  onAnswerChange(questionId: string, answerId: string){
    console.log('onAnswerChange: questionId=' + questionId + ", answerId=" + answerId)
    let question = this.submitedAssignment.questions.find(x => x.questionId === questionId);
    if(question != null){
      if(question?.answers.find(x => x.questionAnswerId == answerId) !== undefined){
        console.log("filter")
        question.answers = question?.answers.filter(x => x.questionAnswerId !== answerId)?? []; 
      }
      else{
        console.log("push")
        question.answers.push({questionAnswerId: answerId});
      }
      console.log("question ", question)
    }
    

  }
}
