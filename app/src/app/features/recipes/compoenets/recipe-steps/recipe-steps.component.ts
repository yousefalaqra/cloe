import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeFacade } from '../../recipe.facade';
import { RecipeStepsResource } from '../../resources/recipe-step.resource';
import { RecipeResource } from '../../resources/recipe.resource';

@Component({
  selector: 'recipe-steps',
  templateUrl: './recipe-steps.component.html',
  styleUrls: ['./recipe-steps.component.scss'],
})
export class RecipeStepsComponent implements OnInit, OnDestroy {
  @Input() recipe: RecipeResource;

  subscriptions$: Array<Subscription> = [];

  dummyStep: RecipeStepsResource;
  dummyIndex: number;

  constructor(private _recipeFacade: RecipeFacade) {}

  ngOnInit() {
    this.dummyStep = { description: 'أضف طريقة طهي جديدة', id: 0 };
  }

  onDeleteItem(id: number) {
    this.subscriptions$.push(
      this._recipeFacade.deleteRecipeStep(this.recipe.id, id).subscribe()
    );
  }

  updateStep(step: RecipeStepsResource) {
    this.subscriptions$.push(
      this._recipeFacade
        .updateRecipeStep(this.recipe.id, step.id, step.description)
        .subscribe()
    );
  }

  onAddStep(step: string): void {
    this.subscriptions$.push(
      this._recipeFacade.addRecipeStep(this.recipe.id, step).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}
