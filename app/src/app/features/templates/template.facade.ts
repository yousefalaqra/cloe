import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NutritionValueResource } from '../food/resources/nutrition/nutrition-value.resource';
import { TemplateApi } from './api/template.api';
import { MealsModel } from './models/meal.model';
import { TemplateModel } from './models/template.model';
import { MealResource } from './resources/meal.resource';
import { TemplateResource } from './resources/template.resource';
import { TemplateState } from './state/template.state';

@Injectable()
export class TemplateFacade {
  constructor(
    private _templateState: TemplateState,
    private _templateApi: TemplateApi,
    private _router: Router
  ) {}

  get templates$(): Observable<Array<TemplateResource>> {
    return this._templateState.getTemplates();
  }

  get selectedTemplate$(): Observable<TemplateResource> {
    return this._templateState.getSelectedTemplate();
  }

  get nutritionValue$(): Observable<{
    energy: number;
    fat: number;
    carbs: number;
    protien: number;
  }> {
    return this._templateState.getNutritionValue();
  }

  get loading$(): Observable<boolean> {
    return this._templateState.getLoading();
  }

  loadTemplates(key: string = ''): Observable<any> {
    this._templateState.setLoading(true);
    return this._templateApi.getAllTemplates(key).pipe(
      tap(
        (res: Array<TemplateResource>) => {
          this._templateState.setTemplates(res);
          this._templateState.setLoading(false);
        },
        (res) => {
          this._templateState.setLoading(false);
        }
      )
    );
  }

  loadTemplate(id: number): Observable<any> {
    this._templateState.setLoading(true);
    return this._templateApi.getById(id).pipe(
      tap(
        (res: TemplateResource) => {
          this._templateState.setSelectedTemplate(res);
          this._templateState.setLoading(false);
        },
        (res) => {
          this._templateState.setLoading(false);
        }
      )
    );
  }

  createNewTemplate(model: TemplateModel): Observable<any> {
    this._templateState.addTemplate(model);

    return this._templateApi.addTemplate(model).pipe(
      tap(
        (res: TemplateResource) => {
          this._router.navigate([`template/details/${res.id}`]);
        },
        () => {}
      )
    );
  }

  updateTemplate(id: number, model: TemplateModel): Observable<any> {
    this._templateState.updateTemplate(id, model);

    return this._templateApi.UpdateTemplate(id, model).pipe(
      tap(
        (res: TemplateResource) => {
          this._templateState.setSelectedTemplate(res);
        },
        () => {}
      )
    );
  }

  removeTemplate(id: number): Observable<any> {
    this._templateState.removeTemplate(id);

    return this._templateApi.removeTemplate(id).pipe(
      tap(
        () => {
          this._router.navigate([`template`]);
        },
        () => {}
      )
    );
  }

  createPlanMeal(
    templateId: number,
    planId: number,
    meal: MealsModel
  ): Observable<any> {
    debugger;
    this._templateState.setLoading(true);
    return this._templateApi.addPlanMeal(templateId, planId, meal).pipe(
      tap(
        (res) => {
          this._templateState.setSelectedTemplate(res);
          this._templateState.setLoading(false);
        },
        () => {
          this._templateState.setLoading(false);
        }
      )
    );
  }

  getNutritionValue(id: number): Observable<any> {
    return this._templateApi.getNutritionValue(id).pipe(
      tap(
        (res: NutritionValueResource) => {
          this._templateState.setNutritionValue({
            energy: res.totalCalories,
            carbs: res.totalCarbohydrates,
            fat: res.totalFat,
            protien: res.totalProtein,
          });
        },
        () => {}
      )
    );
  }
}
