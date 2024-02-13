import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeFacade } from '../../recipe.facade';
import { RecipeResource } from '../../resources/recipe.resource';

@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  subscriptions$: Array<Subscription> = [];
  loading: boolean;
  recipeId: number;
  selectedRecipe: RecipeResource;
  nutritionValue: {
    energy: number;
    fat: number;
    carbs: number;
    protien: number;
  } 
  isShowAddCategoryFrom: boolean = false;

  categoryFormControl = new FormControl('');

  constructor(
    private _recipeFacade: RecipeFacade,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._recipeFacade.selectedRecipe$.subscribe((x) => {
        this.selectedRecipe = x;
        this.nutritionValue = {
          fat: x?.fat,
          energy: x?.energy,
          carbs: x?.carbs,
          protien: x?.protien,
        }
        
      }),
      this._recipeFacade.loading$.subscribe((x) => (this.loading = x)),
      this._activatedRoute.params.subscribe((x) => (this.recipeId = x['id'])),
      this._recipeFacade.loadRecipe(this.recipeId).subscribe()
    );
  }

  onDeleteCategory(id: number): void {}

  onAddCategory(): void {
    this.isShowAddCategoryFrom = true;
  }

  onCategoryFocusOut(): void {
    this.isShowAddCategoryFrom = false;
    this.categoryFormControl.setValue('');
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}
