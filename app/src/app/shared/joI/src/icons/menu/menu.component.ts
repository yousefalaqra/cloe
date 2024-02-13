import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'joi-menu',
  templateUrl: './menu.component.html',
})
export class MenuIcon implements OnInit {
  @Input() color: string = '#ffff';
  constructor() {}

  ngOnInit() {}
}
