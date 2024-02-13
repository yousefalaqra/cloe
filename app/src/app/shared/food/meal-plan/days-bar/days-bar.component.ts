import { Component, Input, OnInit } from '@angular/core';
import { PlanResource } from 'src/app/features/templates/resources/plan.resource';

@Component({
  selector: 'days-bar',
  templateUrl: './days-bar.component.html',
  styleUrls: ['./days-bar.component.scss']
})
export class DaysBarComponent implements OnInit {
  @Input() plan: any;
  constructor() { }

  ngOnInit() {
  }

}
