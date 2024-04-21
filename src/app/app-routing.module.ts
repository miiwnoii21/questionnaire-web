import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { QuestionListComponent } from './question-list/question-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'category-list', component: CategoryListComponent},
  { path: 'question-list', component: QuestionListComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
