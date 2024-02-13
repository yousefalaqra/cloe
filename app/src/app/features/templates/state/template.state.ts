import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TemplateModel } from '../models/template.model';
import { TemplateResource } from '../resources/template.resource';

@Injectable()
export class TemplateState {
  private templates = new BehaviorSubject<Array<TemplateResource>>([]);
  private selectedTemplate = new BehaviorSubject<TemplateResource>(null);
  private loading = new BehaviorSubject<boolean>(false);

  private nutritionValue = new BehaviorSubject<{
    energy: number;
    fat: number;
    carbs: number;
    protien: number;
  }>(null);

  getTemplates(): Observable<Array<TemplateResource>> {
    return this.templates.asObservable();
  }

  getSelectedTemplate(): Observable<TemplateResource> {
    return this.selectedTemplate.asObservable();
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  getNutritionValue(): Observable<{
    energy: number;
    fat: number;
    carbs: number;
    protien: number;
  }> {
    return this.nutritionValue.asObservable();
  }

  setTemplates(templates: Array<TemplateResource>): void {
    this.templates.next(templates);
  }

  setNutritionValue(value: {
    energy: number;
    fat: number;
    carbs: number;
    protien: number;
  }): void {
    this.nutritionValue.next(value);
  }

  setSelectedTemplate(template: TemplateResource): void {
    this.selectedTemplate.next(template);
  }

  setLoading(value: boolean): void {
    this.loading.next(value);
  }

  addTemplate(template: TemplateModel): void {
    let currentTemplates = this.templates.getValue();

    let resource = this.modelToResource(template);

    let newTemplate = currentTemplates.concat(resource);

    this.templates.next(newTemplate);
  }

  updateTemplate(id: number, model: TemplateModel): void {
    let currentTemplates = this.templates.getValue();

    let newTemplate = currentTemplates.map((x) => {
      if (x.id == id) {
        if (model.name != '' || model.name != null) x.name = model.name;

        return x;
      } else {
        return x;
      }
    });

    this.templates.next(newTemplate);
  }

  removeTemplate(id: number): void {
    let currentTemplates = this.templates.getValue();

    let newTemplate = currentTemplates.filter((x) => x.id != id);

    this.templates.next(newTemplate);
  }

  private modelToResource(model: TemplateModel): TemplateResource {
    let resource = {
      createdAt: new Date(Date.now()),
      createdBy: 'Jo Aqra',
      id: new Date().getUTCMilliseconds(),
      name: model.name,
      protien: 0,
      carbs: 0,
      fat: 0,
      energy: 0,
      plans: [],
    } as TemplateResource;
    return resource;
  }
}
