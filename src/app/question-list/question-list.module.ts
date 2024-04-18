import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionListRoutingModule } from './question-list-routing.module';
import { QuestionListComponent } from './question-list.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    QuestionListComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    QuestionListRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule
  ]
})
export class QuestionListModule { }
