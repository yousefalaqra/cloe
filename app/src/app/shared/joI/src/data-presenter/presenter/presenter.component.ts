import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'presenter',
  templateUrl: './presenter.component.html',
  styleUrls: ['./presenter.component.scss'],
})
export class PresenterComponent implements OnInit {
  @Input('title') title: string;
  @Input('value') value: string;
  @Input('type') inputType: 'dropDown' | 'normal' | 'none' = 'normal';

  @Output('onEdit') onEdit = new EventEmitter<boolean>();

  @Output() onSave = new EventEmitter<any>();

  @Input() editMood: boolean = false;

  constructor() {}

  ngOnInit() {}

  onDataClick() {
    // this.editMood.next = !this.editMood;
  }

  onChangeMood(value: boolean) {
    this.onEdit.emit(value);
  }

  onSaveData(): void {
    this.onSave.emit();
  }

  toggleEdit(value: boolean): void {
    this.editMood = value;
  }
}
