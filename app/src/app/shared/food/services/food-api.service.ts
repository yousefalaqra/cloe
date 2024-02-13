import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FoodItemResource } from 'src/app/features/food/resources/foodItem/food-item.resource';
import { RecipeResource } from 'src/app/features/recipes/resources/recipe.resource';
import { UnitResource } from 'src/app/features/settings/resources/unit/unit.resource';
import { environment } from 'src/environments/environment';

@Injectable()
export class FoodApiService {
  constructor(private http: HttpClient) {}

  getFoodItems(searchKey: string = ''): Observable<Array<FoodItemResource>> {
    return this.http
      .get(`${environment.api}/FoodItem`, { params: { name: searchKey } })
      .pipe(map((x: any) => x.result));
  }

  getRecipes(searchKey: string = ''): Observable<Array<RecipeResource>> {
    return this.http
      .get(`${environment.api}/Recipe`, { params: { name: searchKey } })
      .pipe(map((x: any) => x.result));
  }

  getUnits(): Observable<Array<UnitResource>> {
    return this.http
      .get(`${environment.api}/Settings/Units`)
      .pipe(map((x: any) => x.result));
  }
}
