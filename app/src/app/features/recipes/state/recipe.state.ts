import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodItemModel } from '../../food/models/food-item.model';
import { RecipeModel } from '../models/recipe.model';
import { RecipeCategoryResource } from '../resources/recipe-category.resource';
import { RecipeIngredientResource } from '../resources/recipe-ingredient.resource';
import { RecipeStepsResource } from '../resources/recipe-step.resource';
import { RecipeResource } from '../resources/recipe.resource';

@Injectable()
export class RecipeState {
  private recipes = new BehaviorSubject<Array<RecipeResource>>([]);
  private loading = new BehaviorSubject<boolean>(false);
  private selectedRecipe = new BehaviorSubject<RecipeResource>(null);

  getRecipes(): Observable<Array<RecipeResource>> {
    return this.recipes.asObservable();
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  getSelectedRecipe(): Observable<RecipeResource> {
    return this.selectedRecipe.asObservable();
  }

  setRecipes(recipes: Array<RecipeResource>): void {
    this.recipes.next(recipes);
  }

  setLoading(value: boolean): void {
    this.loading.next(value);
  }

  setSelectedRecipe(recipe: RecipeResource): void {
    this.selectedRecipe.next(recipe);
  }

  setSelectedRecipeById(recipeId: number): void {
    let currentRecipes = this.recipes.getValue();

    let recipe = currentRecipes.find((x) => x.id == recipeId);

    this.setSelectedRecipe(recipe);
  }

  addRecipe(model: RecipeModel): void {
    let resource = this.modelToResource(model);
    let currentValue = this.recipes.getValue();
    this.recipes.next([...currentValue, resource]);
  }

  updateRecipeName(id: number, name: string): void {
    let currentValue = this.recipes.getValue();

    let newRecipes = currentValue.map((x) =>
      x.id == id ? ({ ...x, name: name } as RecipeResource) : x
    );

    this.recipes.next([...newRecipes]);
  }

  updateRecipeDescription(id: number, description: string): void {
    let currentValue = this.recipes.getValue();

    let newRecipes = currentValue.map((x) =>
      x.id == id ? ({ ...x, description: description } as RecipeResource) : x
    );

    this.recipes.next([...newRecipes]);
  }

  updateRecipePreparationTime(id: number, preparationTime: Date): void {
    let currentValue = this.recipes.getValue();

    let newRecipes = currentValue.map((x) =>
      x.id == id
        ? ({ ...x, preparationTime: preparationTime } as RecipeResource)
        : x
    );

    this.recipes.next([...newRecipes]);
  }

  deleteRecipe(id: number): void {
    let currentValue = this.recipes.getValue();

    let newRecipes = currentValue.filter((x) => x.id !== id);

    this.recipes.next([...newRecipes]);
  }

  addRecipeCategory(recipeId: number, category: string): number {
    let categoryId = new Date().getUTCMilliseconds();
    let recipeCategoryResource = {
      categroy: category,
      id: categoryId,
    } as RecipeCategoryResource;

    let currentRecipe = this.selectedRecipe.getValue();

    currentRecipe.categories.concat(recipeCategoryResource);

    this.selectedRecipe.next(currentRecipe);

    return categoryId;
  }

  removeRecipeCategory(categoryId: number): void {
    let currentRecipe = this.selectedRecipe.getValue();

    currentRecipe.categories.filter((x) => x.id != categoryId);
    this.selectedRecipe.next(currentRecipe);
  }

  addRecipeIngredient(
    recipeId: number,
    itemId: number,
    model: FoodItemModel
  ): void {
    let currentRecipe = this.selectedRecipe.getValue();

    let resource: RecipeIngredientResource = {
      foodItemId: itemId,
      recipeId: recipeId,
      foodItemName: model.name,
      quantity: model.baseQuantity,
      unitId: model.unitId,
    };

    currentRecipe.ingredients.concat(resource);

    this.selectedRecipe.next(currentRecipe);
  }

  validateAddRecipe(recipeId: number, itemId: number): boolean {
    let currentRecipe = this.selectedRecipe.getValue();

    return currentRecipe.ingredients.some(
      (x) => x.foodItemId == itemId && x.recipeId == recipeId
    );
  }

  updateRecipeIngredient(
    itemId: number,
    recipeId: number,
    model: FoodItemModel
  ): void {
    let currentRecipe = this.selectedRecipe.getValue();

    currentRecipe.ingredients.map((x) => {
      let result = { ...x };
      if (x.recipeId == recipeId && x.foodItemId == itemId) {
        if (model.baseQuantity) result.quantity = model.baseQuantity;
        if (model.unitId) result.unitId = model.unitId;

        return result;
      } else {
        return result;
      }
    });

    this.selectedRecipe.next(currentRecipe);
  }

  deleteRecipeIngredient(itemId: number, recipeId: number): void {
    let currentRecipe = this.selectedRecipe.getValue();

    currentRecipe.ingredients.filter(
      (x) => x.recipeId != recipeId && x.foodItemId != itemId
    );

    this.selectedRecipe.next(currentRecipe);
  }

  addRecipeStep(step: string): void {
    let currentRecipe = this.selectedRecipe.getValue();
    let stepResource: RecipeStepsResource = {
      description: step,
      id: new Date().getUTCMilliseconds(),
    };

    currentRecipe.steps.concat(stepResource);

    this.selectedRecipe.next(currentRecipe);
  }

  updateRecipeStep(stepId: number, step: string): void {
    let currentRecipe = this.selectedRecipe.getValue();
    currentRecipe.steps.map((x) =>
      x.id == stepId ? { ...x, description: step } : x
    );

    this.selectedRecipe.next(currentRecipe);
  }

  deleteRecipeStep(stepId: number): void {
    let currentRecipe = this.selectedRecipe.getValue();

    currentRecipe.steps.filter((x) => x.id != stepId);

    this.selectedRecipe.next(currentRecipe);
  }

  modelToResource(model: RecipeModel): RecipeResource {
    let resource: RecipeResource = {
      description: model.description,
      id: new Date().getUTCMilliseconds(),
      name: model.name,
      preparationTime: model.preparationTime,
      carbs: 0,
      energy: 0,
      fat: 0,
      protien: 0,
      categories: [],
      steps: [],
      ingredients: [],
      createdAt: new Date(),
      createdBy: 'Jo Aqra',
    };

    return resource;
    return;
  }
}
