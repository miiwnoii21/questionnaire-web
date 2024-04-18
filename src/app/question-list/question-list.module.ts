import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionListRoutingModule } from './question-list-routing.module';
import { QuestionListComponent } from './question-list.component';


@NgModule({
  declarations: [
    QuestionListComponent
  ],
  imports: [
    CommonModule,
    QuestionListRoutingModule
  ]
})
export class QuestionListModule { }
