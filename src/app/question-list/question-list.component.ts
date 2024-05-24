import { Component } from '@angular/core';
import { QuestionnaireService } from '../services/questionnaire/questionnaire.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { StorageService } from '../services/storage/storage.service';

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
    private storageService: StorageService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
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
          this.setExamCounterTime(this.questionCategoryDetail.timeLimitOfMinuteUnit);
        }
      },
    });
  }

  onSubmit() {
      this.questionnaireService.submitAssignment(this.submitedAssignment).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.router.navigate(['/score-summary'], {queryParams: {score: response.data.score, fullScore: response.data.fullScore}});
          }
        }
      });
  }

  onAnswerChange(questionId: string, answerId: string){
    console.log('onAnswerChange: questionId=' + questionId + ", answerId=" + answerId)
    let question = this.submitedAssignment.questions.find(x => x.questionId === questionId);
    if(question != null){
      if(question?.answers.find(x => x.questionAnswerId == answerId) !== undefined){
        question.answers = question?.answers.filter(x => x.questionAnswerId !== answerId)?? []; 
      }
      else{
        question.answers.push({questionAnswerId: answerId});
      }
    }
  }

  setExamCounterTime(limitTimerInMinute: number){
    let hour = 0;
    let minute = 0;
    let second = 0;
    [hour, minute, second] = this.storageService.getRemainingExamTime()
    if(hour === 0 && minute === 0 && second === 0){
      console.log('setExamCounterTime: ' + limitTimerInMinute)
      hour = Math.floor(limitTimerInMinute / 60);
      minute = limitTimerInMinute % 60;
      second = 0;
    
      
    }
    this.storageService.saveRemainingExamTime(hour, minute, second);
  }

  submitExam(isTimeUp: boolean){
    if(isTimeUp){
      this.onSubmit();
    }
  }
}
