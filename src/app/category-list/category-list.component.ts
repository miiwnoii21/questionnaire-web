import { Component } from '@angular/core';
import { QuestionCategory } from '../models/question-category/question-category';
import { Router } from '@angular/router';
import { QuestionnaireService } from '../services/questionnaire/questionnaire.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  questionCategories: QuestionCategory[] = [];
  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router
  ) {}

  ngOnInit() {
    this.questionnaireService.getQuestionCategories().subscribe({
      next: (response: { isSuccess: any; data: QuestionCategory[]; }) => {
        console.log('data');
        console.log(response);
        if (response.isSuccess) {
          this.questionCategories = response.data;
          console.log(JSON.stringify(this.questionCategories));
        }
      },
    });
  }

  selectCategory(categoryId: string) {
    console.log('selectCategory' + categoryId);
    this.router.navigate(['/question-list']);
    // this.questionnaireService.getQuestions(categoryId).subscribe({
    //   next: (response) => {
    //     response.data
    //   }
    // });
  }
}
