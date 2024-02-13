import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FoodItemModel } from '../../food/models/food-item.model';
import { RecipeModel } from '../models/recipe.model';
import { RecipeCategoryResource } from '../resources/recipe-category.resource';
import { RecipeResource } from '../resources/recipe.resource';

@Injectable()
export class RecipeApi {
  private readonly API = `${environment.api}/Recipe`;

  constructor(private _http: HttpClient) {}

  getRecipes(name: string = ''): Observable<Array<RecipeResource>> {
    return this._http
      .get(this.API, { params: { name: name } })
      .pipe(map((res: any) => res.result));
  }

  getRecipe(id: number): Observable<RecipeResource> {
    return this._http
      .get(`${this.API}/${id}`)
      .pipe(map((res: any) => res.result));
  }

  addRecipe(model: RecipeModel): Observable<RecipeResource> {
    return this._http.post(this.API, model).pipe(map((res: any) => res.result));
  }

  addRecipeCategory(
    recipeId: number,
    category: string
  ): Observable<RecipeResource> {
    return this._http
      .patch(`${this.API}/${recipeId}/category/${category}`, {})
      .pipe(map((x: any) => x.result));
  }

  removeRecipeCategory(
    recipeId: number,
    categoryId: number
  ): Observable<RecipeResource> {
    return this._http
      .delete(`${this.API}/${recipeId}/category/${categoryId}`)
      .pipe(map((x: any) => x.result));
  }

  updateRecipe(id: number, model: RecipeModel): Observable<RecipeResource> {
    return this._http
      .put(`${this.API}/${id}`, model)
      .pipe(map((res: any) => res.result));
  }

  addRecipeIngredient(
    id: number,
    itemId: number,
    model: FoodItemModel
  ): Observable<RecipeResource> {
    return this._http
      .post(`${this.API}/${id}/food/${itemId}`, model)
      .pipe(map((res: any) => res.result));
  }

  updateRecipeIngredient(
    id: number,
    itemId: number,
    model: FoodItemModel
  ): Observable<RecipeResource> {
    return this._http
      .patch(`${this.API}/${id}/food/${itemId}`, model)
      .pipe(map((res: any) => res.result));
  }

  deleteRecipeIngredient(
    id: number,
    itemId: number
  ): Observable<RecipeResource> {
    return this._http
      .delete(`${this.API}/${id}/food/${itemId}`)
      .pipe(map((res: any) => res.result));
  }

  addRecipeStep(id: number, step: string): Observable<RecipeResource> {
    return this._http
      .post(`${this.API}/${id}/step/${step}`, {})
      .pipe(map((res: any) => res.result));
  }

  updateRecipeStep(
    id: number,
    stepId: number,
    step: string
  ): Observable<RecipeResource> {
    return this._http
      .patch(`${this.API}/${id}/step/${stepId}/${step}`, {})
      .pipe(map((res: any) => res.result));
  }

  deleteRecipeStep(id: number, stepId: number): Observable<RecipeResource> {
    return this._http
      .delete(`${this.API}/${id}/step/${stepId}`)
      .pipe(map((res: any) => res.result));
  }

  deleteRecipe(id: number): Observable<any> {
    return this._http
      .delete(`${this.API}/${id}`)
      .pipe(map((res: any) => res.result));
  }
}
