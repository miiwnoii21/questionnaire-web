import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-score-summary',
  templateUrl: './score-summary.component.html',
  styleUrl: './score-summary.component.css'
})
export class ScoreSummaryComponent {

  score : string = '';
  fullScore : string = '';

  constructor(private route: ActivatedRoute, private router: Router){
  }

  ngOnInit(){
    this.score = this.route.snapshot.queryParamMap.get('score')?? '';
    this.fullScore = this.route.snapshot.queryParamMap.get('fullScore')?? '';
  }

  goToCategoryList() {
    this.router.navigate(['category-list']);
  }
}
