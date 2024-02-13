import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NutritionValueResource } from '../../food/resources/nutrition/nutrition-value.resource';
import { MealsModel } from '../models/meal.model';
import { TemplateModel } from '../models/template.model';
import { TemplateResource } from '../resources/template.resource';

@Injectable()
export class TemplateApi {
  private readonly API = `${environment.api}/Template`;

  constructor(private _http: HttpClient) {}

  getAllTemplates(key: string = ''): Observable<Array<TemplateResource>> {
    return this._http
      .get(this.API, { params: { name: key } })
      .pipe(map((x: any) => x.result));
  }

  getById(id: number): Observable<TemplateResource> {
    return this._http.get(`${this.API}/${id}`).pipe(map((x: any) => x.result));
  }

  addTemplate(model: TemplateModel): Observable<TemplateResource> {
    return this._http.post(this.API, model).pipe(map((x: any) => x.result));
  }

  getNutritionValue(id: number): Observable<NutritionValueResource> {
    return this._http
      .get(`${this.API}/NutritionValue/${id}`)
      .pipe(map((x: any) => x.result));
  }

  UpdateTemplate(
    id: number,
    model: TemplateModel
  ): Observable<TemplateResource> {
    return this._http
      .put(`${this.API}/${id}`, model)
      .pipe(map((x: any) => x.result));
  }

  removeTemplate(id: number): Observable<boolean> {
    return this._http
      .delete(`${this.API}/${id}`)
      .pipe(map((x: any) => x.result));
  }

  addPlanMeal(
    templateId: number,
    planId: number,
    meal: MealsModel
  ): Observable<boolean> {
    return this._http
      .post(`${this.API}/${templateId}/meals/${planId}`, meal)
      .pipe(map((x: any) => x.result));
  }
}
