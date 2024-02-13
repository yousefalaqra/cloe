import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tap-label',
  templateUrl: './tap-label.component.html',
  styleUrls: ['./tap-label.component.scss'],
})
export class TapLabelComponent implements OnInit {
  @Input() tapIndex: number;
  @Input() active: boolean;
  @Input() tapTitle: string;
  @Input() tapDescription: string;
  @Input() tapIcon: string;

  @Output() onTapClick = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onClick(): void {
    this.onTapClick.emit(this.tapIndex);
  }
}
