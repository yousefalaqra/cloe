import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeFacade } from '../../recipe.facade';
import { RecipeResource } from '../../resources/recipe.resource';

@Component({
  selector: 'recipe-basic-card',
  templateUrl: './recipe-basic-card.component.html',
  styleUrls: ['./recipe-basic-card.component.scss'],
})
export class RecipeBasicCardComponent implements OnInit, OnDestroy {
  @Input() recipe: RecipeResource;

  subscriptions$: Array<Subscription> = [];
  loading: boolean;
  recipeId: number;
  isShowAddCategoryFrom: boolean = false;

  categoryFormControl = new FormControl('');

  constructor(private _recipeFacade: RecipeFacade) {}

  ngOnInit() {}

  onDeleteCategory(id: number): void {
    this.subscriptions$.push(
      this._recipeFacade.removeRecipeCategory(this.recipe.id, id).subscribe()
    )
  }

  onAddCategory(): void {
    this.isShowAddCategoryFrom = true;
  }

  onCategoryFocusOut(): void {
    if (this.categoryFormControl.value != '') {
      this.subscriptions$.push(
        this._recipeFacade
          .addRecipeCategory(this.recipe.id, this.categoryFormControl.value)
          .subscribe()
      );
    }

    this.isShowAddCategoryFrom = false;
    this.categoryFormControl.setValue('');
  }

  confirmDelete(): void {
    this.subscriptions$.push(
      this._recipeFacade.deleteRecipe(this.recipe.id).subscribe()
    );
  }

  cancel(): void {}

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}
