import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tab-actions',
  templateUrl: './tab-actions.component.html',
  styleUrls: ['./tab-actions.component.scss']
})
export class TabActionsComponent implements OnInit {
  @ViewChild(TemplateRef)
  actionsContent: TemplateRef<any>;




  constructor() { }

  ngOnInit() {
  }

}
