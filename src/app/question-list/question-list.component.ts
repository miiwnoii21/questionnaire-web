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
  // formGroupList: unknown[] = [];
  constructor(private questionnaireService: QuestionnaireService, private route: ActivatedRoute, private formBuilder: FormBuilder){

  }

  ngOnInit(){
    console.log('test')
    const categoryId = this.route.snapshot.queryParamMap.get('category')?? '';
    console.log(JSON.stringify(categoryId))
    this.questionnaireService.getQuestions(categoryId).subscribe({
      next: (response) => {
        console.log("getQuestions");
        console.log(response);
        if(response.isSuccess){
          this.questionCategoryDetail = response.data
          //console.log(JSON.stringify(this.questions))
          // this.questionCategoryDetail.questionInfo.forEach(question => {
          //   this.formGroupList.push({
          //     id: question.questionId,
          //     seq: question.sequence,
          //     formGroup: new FormGroup({}),
          //   });
          //   // this.questionFormGroup.addControl(question.questionId, new FormControl('answer', Validators.required));
          // });

          // console.log('xxxxxxx',this.formGroupList)
        }
      }
    })
  }
  // onSubmit(){
  //   console.log('submit')
  // }

}
