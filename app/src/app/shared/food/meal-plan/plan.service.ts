import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FoodItemModel } from 'src/app/features/food/models/food-item.model';
import { RecipeModel } from 'src/app/features/recipes/models/recipe.model';
import { RecipeResource } from 'src/app/features/recipes/resources/recipe.resource';
import { MealsModel } from 'src/app/features/templates/models/meal.model';
import { MealFoodItemResource } from 'src/app/features/templates/resources/meal-food-item.resource';
import { MealResource } from 'src/app/features/templates/resources/meal.resource';
import { PlanResource } from 'src/app/features/templates/resources/plan.resource';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlanService {
  private readonly Meals_API = `${environment.api}/Template/meals`;
  private readonly RECIPES_API = `${environment.api}/Template/recipe`;
  private readonly ITEMS_API = `${environment.api}/Template/item`;
  constructor(private _http: HttpClient) {}

  private isLoading = new BehaviorSubject<boolean>(false);
  private loadNuValue = new BehaviorSubject<boolean>(false);

  private plansMap = new BehaviorSubject<
    Array<{
      id: 0;
      plan: PlanResource;
      isActive: boolean;
    }>
  >([]);

  get loadNuValue$(): Observable<boolean>{
    return this.loadNuValue.asObservable();
  }

  setPlansMap(plans: Array<PlanResource>): void {
    let nextMap = [];

    let index = 0;
    plans.forEach((x) => {
      let object = {
        id: index,
        plan: x,
        isActive: false,
      };

      nextMap.push(object);
      index += 1;
    });

    nextMap[0].isActive = true;
    this.plansMap.next(nextMap);
  }

  getPlanMap() {
    return this.plansMap.asObservable();
  }

  setActivePlan(id: number) {
    let currentMap = this.plansMap.getValue();

    let nextMap = currentMap.map((x) =>
      x.id == id ? { ...x, isActive: true } : { ...x, isActive: false }
    );

    this.plansMap.next(nextMap);
  }

  getActiveMap() {
    return this.plansMap.pipe(map((x) => x.find((y) => y.isActive == true)));
  }

  getLoading() {
    return this.isLoading.asObservable();
  }

  AddNewMeal(planId: number, model: MealsModel): Observable<MealResource> {
    this.isLoading.next(true);
    return this._http
      .post(`${this.Meals_API}/${planId}`, model)
      .pipe(map((res: any) => res.result));
  }

  addMeal(meal: MealResource): void {
    let currentMap = this.plansMap.getValue();
    meal.items = [];
    meal.recipes = [];
    let newMap = currentMap.map((x) =>
      x.isActive == true
        ? { ...x, plan: { ...x.plan, meals: x.plan.meals.concat(meal) } }
        : x
    );

    this.plansMap.next(newMap);

    let mealHtmlElement = document.getElementById(`${meal.id}`);

    if (mealHtmlElement) mealHtmlElement.scrollIntoView({ behavior: 'smooth' });

    this.isLoading.next(false);
  }

  removeMeal(mealId: number): Observable<any> {
    this.isLoading.next(true);
    let currentMap = this.plansMap.getValue();

    let newMap = currentMap.map((x) =>
      x.isActive == true
        ? {
            ...x,
            plan: {
              ...x.plan,
              meals: x.plan.meals.filter((y) => y.id != mealId),
            },
          }
        : x
    );
    this.plansMap.next(newMap);

    return this._http.delete(`${this.Meals_API}/${mealId}`).pipe(
      tap(
        () => {
          this.isLoading.next(false);
        },
        () => {
          this.isLoading.next(false);
        }
      )
    );
  }

  updateMeal(mealId: number, model: MealsModel): Observable<any> {
    this.isLoading.next(true);
    let currentMap = this.plansMap.getValue();

    let newMap = currentMap.map((x) =>
      x.isActive == true
        ? {
            ...x,
            plan: {
              ...x.plan,
              meals: x.plan.meals.map((y) =>
                y.id == mealId
                  ? { ...y, name: model.name, time: model.time }
                  : y
              ),
            },
          }
        : x
    );
    this.plansMap.next(newMap);

    return this._http.put(`${this.Meals_API}/${mealId}`, model).pipe(
      tap(
        () => {
          this.isLoading.next(false);
        },
        () => {
          this.isLoading.next(false);
        }
      )
    );
  }

  addMealRecipe(
    mealId: number,
    recipeId: number,
    model: RecipeModel
  ): Observable<any> {
    this.isLoading.next(true);
    let currentMap = this.plansMap.getValue();

    let newMap = currentMap.map((x) =>
      x.isActive == true
        ? {
            ...x,
            plan: {
              ...x.plan,
              meals: x.plan.meals.map((y) =>
                y.id == mealId
                  ? {
                      ...y,
                      recipes: y.recipes.concat({
                        id: recipeId,
                        name: model.name,
                      } as RecipeResource),
                    }
                  : y
              ),
            },
          }
        : x
    );

    this.plansMap.next(newMap);

    return this._http
      .post(`${this.RECIPES_API}/${mealId}/${recipeId}`, model)
      .pipe(
        tap(
          (res: any) => {
            let newMap = currentMap.map((x) =>
            x.isActive == true
              ? {
                  ...x,
                  plan: {
                    ...x.plan,
                    meals: x.plan.meals.map((y) =>
                      y.id == mealId
                        ? res.result
                        : y
                    ),
                  },
                }
              : x
          );
      
          this.loadNuValue.next(true);
          this.plansMap.next(newMap);
          this.isLoading.next(false)
          },
          (_) => this.isLoading.next(false)
        )
      );
  }

  deleteMealRecipe(mealId: number, recipeId: number): Observable<any> {
    this.isLoading.next(true);
    let currentMap = this.plansMap.getValue();

    let newMap = currentMap.map((x) =>
      x.isActive == true
        ? {
            ...x,
            plan: {
              ...x.plan,
              meals: x.plan.meals.map((y) =>
                y.id == mealId
                  ? {
                      ...y,
                      recipes: y.recipes.filter((l) => l.id != recipeId),
                    }
                  : y
              ),
            },
          }
        : x
    );

    this.plansMap.next(newMap);

    return this._http.delete(`${this.RECIPES_API}/${mealId}/${recipeId}`).pipe(
      tap(
        (res: any) => {
          let newMap = currentMap.map((x) =>
          x.isActive == true
            ? {
                ...x,
                plan: {
                  ...x.plan,
                  meals: x.plan.meals.map((y) =>
                    y.id == mealId
                      ? res.result
                      : y
                  ),
                },
              }
            : x
        );
        this.loadNuValue.next(true);
        this.plansMap.next(newMap);
        this.isLoading.next(false)
        },
        (_) => this.isLoading.next(false)
      )
    );
  }

  addMealItem(
    mealId: number,
    itemId: number,
    model: FoodItemModel
  ): Observable<any> {
    this.isLoading.next(true);
    let currentMap = this.plansMap.getValue();

    let newMap = currentMap.map((x) =>
      x.isActive == true
        ? {
            ...x,
            plan: {
              ...x.plan,
              meals: x.plan.meals.map((y) =>
                y.id == mealId
                  ? {
                      ...y,
                      items: y.items.concat({
                        foodItemId: itemId,
                        foodItemName: model.name,
                        mealId: mealId,
                        quantity: model.baseQuantity,
                        unitId: model.unitId,
                      } as MealFoodItemResource),
                    }
                  : y
              ),
            },
          }
        : x
    );

    this.plansMap.next(newMap);

    return this._http.post(`${this.ITEMS_API}/${mealId}/${itemId}`, model).pipe(
      tap(
        (res: any) => {
          let newMap = currentMap.map((x) =>
          x.isActive == true
            ? {
                ...x,
                plan: {
                  ...x.plan,
                  meals: x.plan.meals.map((y) =>
                    y.id == mealId
                      ? res.result
                      : y
                  ),
                },
              }
            : x
        );
        this.loadNuValue.next(true);
        this.plansMap.next(newMap);
        this.isLoading.next(false)
        },
        (_) => this.isLoading.next(false)
      )
    );
  }

  updateMealItem(
    mealId: number,
    itemId: number,
    model: FoodItemModel
  ): Observable<any> {
    this.isLoading.next(true);
    let currentMap = this.plansMap.getValue();

    let newMap = currentMap.map((x) =>
      x.isActive == true
        ? {
            ...x,
            plan: {
              ...x.plan,
              meals: x.plan.meals.map((y) =>
                y.id == mealId
                  ? {
                      ...y,
                      items: y.items.map((l) =>
                        l.foodItemId == itemId && l.mealId == mealId
                          ? ({
                              ...l,
                              quantity: model.baseQuantity,
                              unitId: model.unitId,
                            } as MealFoodItemResource)
                          : l
                      ),
                    }
                  : y
              ),
            },
          }
        : x
    );

    this.plansMap.next(newMap);

    return this._http.put(`${this.ITEMS_API}/${mealId}/${itemId}`, model).pipe(
      tap(
        (res: any) => {          
          let newMap = currentMap.map((x) =>
          x.isActive == true
            ? {
                ...x,
                plan: {
                  ...x.plan,
                  meals: x.plan.meals.map((y) =>
                    y.id == mealId
                      ? res.result
                      : y
                  ),
                },
              }
            : x
        );
    
        this.loadNuValue.next(true);
        this.plansMap.next(newMap);
        this.isLoading.next(false)
        },
        (_) => this.isLoading.next(false)
      )
    );
  }

  deleteMealItem(mealId: number, itemId: number): Observable<any> {
    this.isLoading.next(true);
    let currentMap = this.plansMap.getValue();

    let newMap = currentMap.map((x) =>
      x.isActive == true
        ? {
            ...x,
            plan: {
              ...x.plan,
              meals: x.plan.meals.map((y) =>
                y.id == mealId
                  ? {
                      ...y,
                      items: y.items.filter(
                        (l) => l.foodItemId != itemId && l.mealId != mealId
                      ),
                    }
                  : y
              ),
            },
          }
        : x
    );

    this.plansMap.next(newMap);

    return this._http.delete(`${this.ITEMS_API}/${mealId}/${itemId}`).pipe(
      tap(
        (res: any) => {
          let newMap = currentMap.map((x) =>
          x.isActive == true
            ? {
                ...x,
                plan: {
                  ...x.plan,
                  meals: x.plan.meals.map((y) =>
                    y.id == mealId
                      ? res.result
                      : y
                  ),
                },
              }
            : x
        );
    
        this.loadNuValue.next(true);
        this.plansMap.next(newMap);
        this.isLoading.next(false)
        },
        (_) => this.isLoading.next(false)
      )
    );
  }
}
