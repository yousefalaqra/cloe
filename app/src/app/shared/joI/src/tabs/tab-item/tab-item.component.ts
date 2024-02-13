import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { TabActionsComponent } from '../tab-actions/tab-actions.component';
import { TabBodyComponent } from '../tab-body/tab-body.component';
import { TabLabelComponent } from '../tab-label/tab-label.component';

@Component({
  selector: 'tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
})
export class TabItemComponent implements OnInit {
  @Input()
  label: string;

  @Input()
  isActive: boolean;

  @Input() buttonTitle : string;
  @Input() searchPlaceHolder: string;

  @ContentChild(TabBodyComponent)
  bodyComponent: TabBodyComponent;

  @ContentChild(TabLabelComponent)
  labelComponent: TabLabelComponent;

  @ContentChild(TabActionsComponent)
  actionComponent: TabActionsComponent

  constructor() {}

  ngOnInit() {}
}
