import { Component } from '@angular/core';
import { QuestionnaireService } from '../services/questionnaire/questionnaire.service';
import { QuestionCategory } from '../models/question-category/question-category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})

export class QuestionListComponent {
  //questions: QuestionCategory[] = [];
  constructor(private questionnaireService: QuestionnaireService, private route: ActivatedRoute){

  }

  ngOnInit(){
    console.log('test')
    //this.route.snapshot
    const categoryId = this.route.snapshot.queryParamMap.get('category')?? '';
    console.log(JSON.stringify(categoryId))
    this.questionnaireService.getQuestions(categoryId).subscribe({
      next: (response) => {
        console.log("getQuestions");
        console.log(response);
        if(response.isSuccess){
          //this.questions = response.data
          //console.log(JSON.stringify(this.questions))
        }
      }
    })

    // this.questionnaireService.getQuestions(categoryId).subscribe({
    //   next: (response) => {
    //     response.data
    //   }
    // });
  }

  // selectCategory(private categoryId: string){

  // }
}
