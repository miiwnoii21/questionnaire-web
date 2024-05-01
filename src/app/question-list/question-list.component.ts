import { Component } from '@angular/core';
import { QuestionnaireService } from '../services/questionnaire/questionnaire.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionCategoryDetail } from '../models/question-category-detail/question-category-detail';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})

export class QuestionListComponent {
  questionCategoryDetail: QuestionCategoryDetail = new QuestionCategoryDetail();
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  // secondFormGroup = this.formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });

  // questionFormGroup = this.formBuilder.group({
  //   //name: ["", [Validators.required]],
  //   params: this.formBuilder.group({})
  // });
  // questionFormGroup = new FormGroup({});
  constructor(private questionnaireService: QuestionnaireService, private route: ActivatedRoute, private formBuilder: FormBuilder){

  }

  ngOnInit(){
    console.log('test')
    const categoryId = this.route.snapshot.queryParamMap.get('category')?? '';
    console.log(JSON.stringify(categoryId))
    this.questionnaireService.getQuestions(categoryId).subscribe({
      next: (response) => {
        console.log("getQuestions", response);
        if(response.isSuccess){
          this.questionCategoryDetail = response.data
          this.questionCategoryDetail.questionInfo = this.questionCategoryDetail.questionInfo.map(question => {
            return {
              ...question,
              formGroup: this.formBuilder.group({
                [`${question.questionId}-formCtrl`]: ['', Validators.required],
              }),
            }
          });

          console.log('this.questionCategoryDetail', this.questionCategoryDetail)
          console.log('yyyyyy',this.firstFormGroup)
        }
      }
    })
  }
  onSubmit(seq: number){
    console.log('submit', this.questionCategoryDetail.questionInfo[seq -1].formGroup)
  }

}
