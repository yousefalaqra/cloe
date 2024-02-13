import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnDestroy {
  @Input('title') title: string;
  @Input('desc') desc: string;
  @Input('icon') icon: string;
  @Input('loading') loading: boolean;
  @Input('placeholder') placeholder: string;

  @Output('onIcon') onIconClick = new EventEmitter<any>();
  @Output('onSearch') searchKey = new EventEmitter<string>();

  searchKeySubscription: Subscription;

  searchFormControl: FormControl;
  constructor() {}

  ngOnDestroy(): void {
    this.searchKeySubscription?.unsubscribe()
  }

  ngOnInit() {
    this.searchFormControl = new FormControl('');

    this.searchKeySubscription = this.searchFormControl.valueChanges.subscribe((x) => {
      this.searchKey.emit(x);
    });
  }

  onActionClick() {
    // this.showModal = true; this.isUpdate = fals
    this.onIconClick.emit();
  }
}
