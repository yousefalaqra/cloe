import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RecipeStepsResource } from '../../../resources/recipe-step.resource';

@Component({
  selector: 'step-item',
  templateUrl: './step-item.component.html',
  styleUrls: ['./step-item.component.scss'],
})
export class StepItemComponent implements OnInit {
  @Input() step: RecipeStepsResource;
  @Input() index: number;
  @Input() isDummy: boolean = false;

  @Output() onUpdate = new EventEmitter<RecipeStepsResource>();
  @Output() onAdd = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<number>();

  editMode: boolean = false;
  stepControl: FormControl;
  constructor() {}

  ngOnInit() {
    this.stepControl = new FormControl(this.step.description);
  }

  onDeleteItem() {
    this.onDelete.emit(this.step.id);
  }

  updateStep() {
    if (this.isDummy) {
      this.onAdd.emit(this.stepControl.value);
    } else {
      this.step.description = this.stepControl.value;
      this.onUpdate.emit(this.step);
    }
    this.editMode = false;
  }
}
