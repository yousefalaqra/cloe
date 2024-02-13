import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlanService } from 'src/app/shared/food/meal-plan/plan.service';
import { MealsModel } from '../../models/meal.model';
import { TemplateResource } from '../../resources/template.resource';
import { TemplateFacade } from '../../template.facade';

@Component({
  selector: 'template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent implements OnInit, OnDestroy {
  template: TemplateResource;
  loading: boolean = false;

  templateId: number;

  @Input() isClient = false;
  @Input() clientTemplateId: number;

  nutritionValue;

  subscriptions$: Array<Subscription> = [];

  constructor(
    private _templateFacade: TemplateFacade,
    private _activatedRoute: ActivatedRoute,
    private _planService: PlanService
  ) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._templateFacade.loading$.subscribe((x) => (this.loading = x)),
      this._templateFacade.nutritionValue$.subscribe(
        (x) => (this.nutritionValue = x)
      ),
      this._templateFacade.selectedTemplate$.subscribe(
        (x) => (this.template = x)
      )
    );

    let param = this.isClient ? 'templateId' : 'id';
    this.subscriptions$.push(
      this._activatedRoute.params.subscribe(
        (x) => {
          this.templateId = x[param]
        }
      ),
      this._templateFacade.loadTemplate(this.templateId).subscribe(),
      this._templateFacade.getNutritionValue(this.templateId).subscribe(),
      this._planService.loadNuValue$.subscribe((x) => {
        if (x)
          this.subscriptions$.push(
            this._templateFacade.getNutritionValue(this.templateId).subscribe()
          );
      })
    );
  }

  onAddPlans(days: Array<number>): void {
    console.log(days);
  }

  createMeal(data: { planId: number; model: MealsModel }): void {
    this.subscriptions$.push(
      this._templateFacade
        .createPlanMeal(this.template.id, data.planId, data.model)
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}
