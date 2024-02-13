import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeResource } from 'src/app/features/recipes/resources/recipe.resource';

@Component({
  selector: 'recipe-meal-item',
  templateUrl: './recipe-meal-item.component.html',
  styleUrls: ['./recipe-meal-item.component.scss'],
})
export class RecipeMealItemComponent implements OnInit {
  @Input() item: RecipeResource;

  @Output() onDelete = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  onDeleteItem() {
    this.onDelete.emit(this.item.id);
  }
}
