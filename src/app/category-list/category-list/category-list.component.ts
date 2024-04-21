import { Component } from '@angular/core';
import { QuestionCategory } from '../../models/question-category/question-category';
import { QuestionnaireService } from '../../services/questionnaire/questionnaire.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  questionCategories: QuestionCategory[] = [];
  constructor(private questionnaireService: QuestionnaireService){

  }

  ngOnInit(){
    this.questionnaireService.getQuestionCategories().subscribe({
      next: (data) => {
        console.log("data");
        console.log(data);
        if(data.isSuccess){
          this.questionCategories = data.data
          console.log(JSON.stringify(this.questionCategories))
        }
      }
    })
  }

  selectCategory(categoryId: string){
    console.log('selectCategory'+ categoryId)
  }
}
