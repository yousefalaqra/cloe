import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeModel } from '../../models/recipe.model';
import { RecipeFacade } from '../../recipe.facade';
import { RecipeResource } from '../../resources/recipe.resource';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  loading: boolean;
  showModal: boolean;
  isUpdate: boolean;

  recipes: Array<RecipeResource>;

  subscriptions$: Array<Subscription> = [];

  constructor(private _recipeFacade: RecipeFacade) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._recipeFacade.loading$.subscribe((x) => (this.loading = x)),
      this._recipeFacade.recipes$.subscribe((x) => (this.recipes = x)),
      this._recipeFacade.loadRecipes().subscribe()
    );
  }

  searchFoodItems(key: string): void {
    this.subscriptions$.push(this._recipeFacade.loadRecipes(key).subscribe());
  }

  handleCancel(): void {}
  handleOk(): void {}

  private handleCloseModal() {
    this.isUpdate = false;
    this.showModal = false;
  }

  creteDefaultRecipe(): void {
    let model = {
      name: 'وصفة',
    } as RecipeModel;

    this.subscriptions$.push(this._recipeFacade.addRecipe(model).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}
