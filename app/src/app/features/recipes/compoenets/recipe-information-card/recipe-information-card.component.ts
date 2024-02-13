import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzTimePickerComponent } from 'ng-zorro-antd/time-picker';
import { Subscription } from 'rxjs';
import { PresenterComponent } from 'src/app/shared/joI/src/data-presenter/presenter/presenter.component';
import { RecipeFacade } from '../../recipe.facade';
import { RecipeResource } from '../../resources/recipe.resource';

@Component({
  selector: 'recipe-information-card',
  templateUrl: './recipe-information-card.component.html',
  styleUrls: ['./recipe-information-card.component.scss'],
})
export class RecipeInformationCardComponent implements OnInit, OnDestroy {
  @Input() recipe: RecipeResource;

  @ViewChild('recipeNamePresenter') recipeNamePresenter: PresenterComponent;
  recipeNameEditMode: boolean = false;
  recipeNameControl: FormControl;

  @ViewChild('recipeDescPresenter') recipeDescPresenter: PresenterComponent;
  recipeDescEditMode: boolean = false;
  recipeDescControl: FormControl;

  @ViewChild('recipeTimePresenter') recipeTimePresenter: PresenterComponent;
  @ViewChild('timePicker') timePicker: NzTimePickerComponent;
  recipeTimeEditMode: boolean = false;
  recipeTime: Date;

  subscriptions$: Array<Subscription> = [];

  constructor(private _recipeFacade: RecipeFacade) {}

  ngOnInit() {
    this.recipeNameControl = new FormControl(this.recipe.name);
    this.recipeNameControl.disable();

    this.recipeDescControl = new FormControl(this.recipe.description);
    this.recipeDescControl.disable();

    this.recipeTime = this.recipe.preparationTime;
  }

  recipeNameRequestEdit(ev): void {
    this.recipeNameEditMode = ev;
    this.recipeNamePresenter.toggleEdit(ev);
    if (ev == true) {
      this.recipeNameControl.enable();
    } else {
      this.recipeNameControl.setValue(this.recipe.name);
      this.recipeNameControl.disable();
    }
  }

  onSaveRecipeName(ev): void {
    if (this.recipeNameControl.value != '') {
      this.subscriptions$.push(
        this._recipeFacade
          .updateRecipeName(this.recipe.id, this.recipeNameControl.value)
          .subscribe()
      );
    } else {
      this.recipeNameControl.setValue(this.recipe.name);
    }
    this.recipeNameEditMode = false;
    this.recipeNamePresenter.toggleEdit(false);
    this.recipeNameControl.disable();
  }

  recipeDescRequestEdit(ev): void {
    this.recipeDescEditMode = ev;
    this.recipeDescPresenter.toggleEdit(ev);
    if (ev == true) {
      this.recipeDescControl.enable();
    } else {
      this.recipeDescControl.disable();
      this.recipeDescControl.setValue(this.recipe.description);
    }
  }

  onSaveRecipeDesc(ev): void {
    if (this.recipeDescControl.value != '') {
      this.subscriptions$.push(
        this._recipeFacade
          .updateRecipeDescription(this.recipe.id, this.recipeDescControl.value)
          .subscribe()
      );
    } else {
      this.recipeDescControl.setValue(this.recipe.description);
    }

    this.recipeDescEditMode = false;
    this.recipeDescPresenter.toggleEdit(false);
    this.recipeDescControl.disable();
  }

  recipeTimeRequestEdit(ev): void {
    this.recipeTimeEditMode = ev;
    this.recipeTimePresenter.toggleEdit(ev);
    if (ev) {
      this.timePicker.open();
    } else {
      this.recipeTime = this.recipe.preparationTime;
    }
  }

  onSaveRecipeTime(ev): void {
    if (this.recipeTime) {
      this.subscriptions$.push(
        this._recipeFacade
          .updateRecipeTime(this.recipe.id, this.recipeTime)
          .subscribe()
      );
    } else {
      this.recipeTime = this.recipe.preparationTime;
    }

    this.recipeTimeEditMode = false;
    this.recipeTimePresenter.toggleEdit(false);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}
