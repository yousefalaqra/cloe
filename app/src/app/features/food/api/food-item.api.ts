import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UnitResource } from '../../settings/resources/unit/unit.resource';
import { FoodItemModel } from '../models/food-item.model';

@Injectable()
export class FoodItemApi {
  constructor(private http: HttpClient) {}
  private readonly API = `${environment.api}/FoodItem`;

  getFoodItems(name: string = ''): Observable<any> {
    return this.http
      .get(this.API, { params: { name: name } })
      .pipe(map((res: any) => res.result));
  }

  getFoodUnits(): Observable<Array<UnitResource>> {
    return this.http
      .get(`${environment.api}/Settings/Units`)
      .pipe(map((res: any) => res.result));
  }

  addFood(model: FoodItemModel): Observable<any> {
    return this.http.post(this.API, model).pipe(map((res: any) => res.result));
  }
  updateFood(model: FoodItemModel, id: number): Observable<any> {
    return this.http
      .put(this.API + '/' + id, model)
      .pipe(map((res: any) => res.result));
  }

  deleteFood(id): Observable<any> {
    return this.http
      .delete(this.API + '/' + id)
      .pipe(map((res: any) => res.result));
  }
}
