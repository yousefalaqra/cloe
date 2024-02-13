import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'client-gender-dropdown',
  templateUrl: './client-gender-dropdown.component.html',
  styleUrls: ['./client-gender-dropdown.component.scss'],
})
export class ClientGenderDropdownComponent implements OnInit {
  @Input('clientGender') selectedGender: string = '1';
  @Input('open') open: boolean = false;
  @Output() onGenderChange = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  onChange(selected: any): void {
    this.onGenderChange.emit(selected);
  }
}
