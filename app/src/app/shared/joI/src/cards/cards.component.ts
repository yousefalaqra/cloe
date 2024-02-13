import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'joi-card',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() desc: string;
  @Input() icon: string;

  @Output() onAction = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  onIcon(): void {
    this.onAction.emit();
  }
}
