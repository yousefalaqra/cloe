import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nutrition-value',
  templateUrl: './nutrition-value.component.html',
  styleUrls: ['./nutrition-value.component.scss'],
})
export class NutritionValueComponent implements OnInit, OnChanges {
  @Input() nutritionValue: {
    energy: number;
    fat: number;
    carbs: number;
    protien: number;
  };
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    // this.nutritionValue = changes.nutritionValue.currentValue
  }
}
