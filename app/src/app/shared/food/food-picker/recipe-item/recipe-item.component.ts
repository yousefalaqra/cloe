import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeResource } from 'src/app/features/recipes/resources/recipe.resource';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Output() onSelectRecipe = new EventEmitter<RecipeResource>()

  @Input() recipe: RecipeResource;
  constructor() { }

  ngOnInit() {
  }

  onSelectItem(){
    this.onSelectRecipe.emit(this.recipe)
  }

}
