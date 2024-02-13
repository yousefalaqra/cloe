import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FoodItemModel } from 'src/app/features/food/models/food-item.model';
import { RecipeModel } from 'src/app/features/recipes/models/recipe.model';
import { RecipeResource } from 'src/app/features/recipes/resources/recipe.resource';
import { MealsModel } from 'src/app/features/templates/models/meal.model';
import { PlanModel } from 'src/app/features/templates/models/plan.mode';
import { PlanResource } from 'src/app/features/templates/resources/plan.resource';
import { PlanService } from '../plan.service';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit, OnDestroy {
  @Input() plans: Array<PlanResource>;
  plansMap: Array<any>;
  activePlan: any;
  isLoading: boolean = false;

  creationMethods: Array<{}> = [
    { value: '0', label: 'دمج الأيام المحددة في نسخة واحدة' },
    { value: '1', label: 'إنشاء نسخة لكل يوم' },
  ];
  selectedMethod = '1';

  showMergeModal: boolean = false;
  selectedDays: Array<number> = [];
  days: Array<{}> = [
    { day: 1, selected: false },
    { day: 2, selected: false },
    { day: 3, selected: false },
    { day: 4, selected: false },
    { day: 5, selected: false },
    { day: 6, selected: false },
    { day: 7, selected: false },
  ];

  mealsTypes = [
    { key: 0, value: 'وجبة افطار' },
    { key: 1, value: 'غداء' },
    { key: 2, value: 'وجبة عشاء' },
    { key: 3, value: 'وجبة خفيفة الصباح' },
    { key: 4, value: 'وجبة خفيفه بعد الظهر' },
    { key: 5, value: 'وجبة خفيفة قبل التمرين' },
    { key: 6, value: 'وجبة خفيفة بعد التمرين' },
    { key: 7, value: 'وجبة فطور وغداء' },
    { key: 8, value: 'وجبة مميزة' },
  ];

  @Output() onMergeDays = new EventEmitter<Array<number>>();

  @Output() onCreateMeal = new EventEmitter<{
    planId: number;
    model: MealsModel;
  }>();
  @Output() onUpdateMeal = new EventEmitter<{
    mealId: number;
    model: MealsModel;
  }>();

  @Output() onRemoveMeal = new EventEmitter<number>();

  showAddMealPanel: boolean = false;

  subscriptions: Array<Subscription> = [];
  constructor(private _planService: PlanService) {}

  ngOnInit() {
    this._planService.setPlansMap(this.plans);
    this.subscriptions.push(
      this._planService.getPlanMap().subscribe((x) => (this.plansMap = x)),
      this._planService.getActiveMap().subscribe((x) => (this.activePlan = x)),
      this._planService.getLoading().subscribe((x) => (this.isLoading = x))
    );
  }

  onMerge(): void {
    this.showMergeModal = false;

    let selectedDays = this.days
      .filter((x: any) => x.selected == true)
      .map((y: any) => y.day);

    let models: Array<PlanModel> = [];
    selectedDays.forEach((x) => {
      if (this.selectedMethod == '1') {
        // for each selected day make a plan
      } else {
        // for all selected days make a plan
      }
    });

    this.onMergeDays.emit(selectedDays);
  }

  onCreationMethodChanges(values): void {}

  activatePlan(plan): void {
    if (this.isLoading) return;
    this._planService.setActivePlan(plan.id);
  }
  onSelectDay(item) {
    let selectedDay: any = this.days.find((x: any) => x.day == item.day);
    selectedDay.selected = !selectedDay.selected;

    let selectedDays = this.days
      .filter((x: any) => x.selected == true)
      .map((y: any) => y.day);

    this.selectedDays = [...selectedDays];
  }

  onAddMeal() {
    this.showAddMealPanel = !this.showAddMealPanel;

    if (this.showAddMealPanel)
      document.getElementById('scrollMeal').scrollIntoView();
  }

  onSelectMeal(meal) {
    let mealModel: MealsModel = {
      name: meal.value,
      time: new Date(),
    };

    this.subscriptions.push(
      this._planService
        .AddNewMeal(this.activePlan.plan.id, mealModel)
        .subscribe((x) => this._planService.addMeal(x))
    );

    this.showAddMealPanel = false;
  }

  updateMeal(data: { id: number; model: MealsModel }) {
    this.subscriptions.push(
      this._planService.updateMeal(data.id, data.model).subscribe()
    );
  }

  deleteMeal(id) {
    this.subscriptions.push(this._planService.removeMeal(id).subscribe());
  }

  onAddMealRecipe(event: { mealId: number; recipe: RecipeResource }): void {
    this.subscriptions.push(
      this._planService
        .addMealRecipe(event.mealId, event.recipe.id, {
          name: event.recipe.name,
        } as RecipeModel)
        .subscribe()
    );
  }

  onDeleteRecipe(data: { mealId: number; recipeId: number }): void {
    this.subscriptions.push(
      this._planService.deleteMealRecipe(data.mealId, data.recipeId).subscribe()
    );
  }

  onAddItem(data: {
    mealId: number;
    foodItemId: number;
    model: FoodItemModel;
  }): void {
    this.subscriptions.push(
      this._planService
        .addMealItem(data.mealId, data.foodItemId, data.model)
        .subscribe()
    );
  }

  onUpdateItem(data: {
    mealId: number;
    foodItemId: number;
    model: FoodItemModel;
  }): void {
    this.subscriptions.push(
      this._planService
        .updateMealItem(data.mealId, data.foodItemId, data.model)
        .subscribe()
    );
  }

  onDeleteItem(data: { mealId: number; foodItemId: number }): void {
    this.subscriptions.push(
      this._planService.deleteMealItem(data.mealId, data.foodItemId).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
