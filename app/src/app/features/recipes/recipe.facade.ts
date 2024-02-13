import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FoodItemModel } from '../food/models/food-item.model';
import { FoodItemResource } from '../food/resources/foodItem/food-item.resource';
import { RecipeApi } from './api/recipe.api';
import { RecipeModel } from './models/recipe.model';
import { RecipeCategoryResource } from './resources/recipe-category.resource';
import { RecipeResource } from './resources/recipe.resource';
import { RecipeState } from './state/recipe.state';

@Injectable()
export class RecipeFacade {
  constructor(
    private _recipeState: RecipeState,
    private _recipeApi: RecipeApi,
    private _router: Router
  ) {}

  get recipes$(): Observable<Array<RecipeResource>> {
    return this._recipeState.getRecipes();
  }

  get loading$(): Observable<boolean> {
    return this._recipeState.getLoading();
  }

  get selectedRecipe$(): Observable<RecipeResource> {
    return this._recipeState.getSelectedRecipe();
  }

  loadRecipes(name: string = ''): Observable<any> {
    this._recipeState.setLoading(true);

    return this._recipeApi.getRecipes(name).pipe(
      tap(
        (res: Array<RecipeResource>) => {
          this._recipeState.setRecipes(res);
          this._recipeState.setLoading(false);
        },
        (err) => {
          this._recipeState.setLoading(false);
        }
      )
    );
  }

  loadRecipe(id: number): Observable<any> {
    this._recipeState.setLoading(true);

    return this._recipeApi.getRecipe(id).pipe(
      tap(
        (res: RecipeResource) => {
          this._recipeState.setSelectedRecipe(res);
          this._recipeState.setLoading(false);
        },
        (err) => {
          this._recipeState.setLoading(false);
        }
      )
    );
  }

  addRecipe(model: RecipeModel): Observable<any> {
    this._recipeState.addRecipe(model);
    return this._recipeApi.addRecipe(model).pipe(
      tap(
        (res: RecipeResource) => {
          this._router.navigate([`recipe/details/${res.id}`]);
        },
        () => {}
      )
    );
  }

  updateRecipeName(id: number, name: string): Observable<any> {
    this._recipeState.updateRecipeName(id, name);
    return this._recipeApi.updateRecipe(id, { name: name } as RecipeModel);
  }

  updateRecipeDescription(id: number, description: string): Observable<any> {
    this._recipeState.updateRecipeDescription(id, description);
    return this._recipeApi.updateRecipe(id, {
      description: description,
    } as RecipeModel);
  }

  updateRecipeTime(id: number, time: Date): Observable<any> {
    this._recipeState.updateRecipePreparationTime(id, time);
    return this._recipeApi.updateRecipe(id, {
      preparationTime: time,
    } as RecipeModel);
  }

  addRecipeCategory(recipeId: number, category: string): Observable<any> {
    let tempId = this._recipeState.addRecipeCategory(recipeId, category);

    return this._recipeApi.addRecipeCategory(recipeId, category).pipe(
      tap(
        (res: RecipeResource) => {
          this._recipeState.setSelectedRecipe(res);
        },
        () => {
          this._recipeState.removeRecipeCategory(tempId);
        }
      )
    );
  }

  removeRecipeCategory(recipeId: number, categoryId: number): Observable<any> {
    this._recipeState.removeRecipeCategory(categoryId);

    return this._recipeApi.removeRecipeCategory(recipeId, categoryId).pipe(
      tap(
        (res: RecipeResource) => {
          this._recipeState.setSelectedRecipe(res);
        },
        () => {}
      )
    );
  }

  addRecipeIngredient(
    recipeId: number,
    itemId: number,
    model: FoodItemModel
  ): Observable<any> {
    if (this._recipeState.validateAddRecipe(recipeId, itemId)) return of(null);

    this._recipeState.addRecipeIngredient(recipeId, itemId, model);

    return this._recipeApi.addRecipeIngredient(recipeId, itemId, model).pipe(
      tap(
        (res: RecipeResource) => {
          this._recipeState.setSelectedRecipe(res);
        },
        () => {}
      )
    );
  }

  updateRecipeIngredient(
    recipeId: number,
    itemId: number,
    model: FoodItemModel
  ): Observable<any> {
    this._recipeState.updateRecipeIngredient(itemId, recipeId, model);

    return this._recipeApi.updateRecipeIngredient(recipeId, itemId, model).pipe(
      tap(
        (res: RecipeResource) => {
          this._recipeState.setSelectedRecipe(res);
        },
        () => {}
      )
    );
  }

  deleteRecipeIngredient(recipeId: number, itemId: number): Observable<any> {
    this._recipeState.deleteRecipeIngredient(itemId, recipeId);

    return this._recipeApi.deleteRecipeIngredient(recipeId, itemId).pipe(
      tap(
        (res: RecipeResource) => {
          this._recipeState.setSelectedRecipe(res);
        },
        () => {}
      )
    );
  }

  addRecipeStep(recipeId: number, step: string): Observable<any> {
    this._recipeState.addRecipeStep(step);

    return this._recipeApi.addRecipeStep(recipeId, step).pipe(
      tap(
        (res: RecipeResource) => {
          this._recipeState.setSelectedRecipe(res);
        },
        () => {}
      )
    );
  }

  updateRecipeStep(
    recipeId: number,
    stepId: number,
    step: string
  ): Observable<any> {
    this._recipeState.updateRecipeStep(stepId, step);

    return this._recipeApi.updateRecipeStep(recipeId, stepId, step).pipe(
      tap(
        (res: RecipeResource) => {
          this._recipeState.setSelectedRecipe(res);
        },
        () => {}
      )
    );
  }

  deleteRecipeStep(recipeId: number, stepId: number): Observable<any> {
    this._recipeState.deleteRecipeStep(stepId);

    return this._recipeApi.deleteRecipeStep(recipeId, stepId).pipe(
      tap(
        (res: RecipeResource) => {
          this._recipeState.setSelectedRecipe(res);
        },
        () => {}
      )
    );
  }

  deleteRecipe(id: number): Observable<any> {
    this._recipeState.deleteRecipe(id);

    return this._recipeApi.deleteRecipe(id).pipe(
      tap(
        () => {
          this._router.navigate([`recipe`]);
        },
        () => {}
      )
    );
  }
}
