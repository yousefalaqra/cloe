import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'joi-arrow-down',
  templateUrl: './arrow-down-icon.component.html',
})
export class ArrowDownIcon implements OnInit {
  @Input() color: string = '#ffff';

  constructor() {}

  ngOnInit() {}
}
