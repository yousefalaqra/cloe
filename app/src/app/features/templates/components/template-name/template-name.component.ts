import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PresenterComponent } from 'src/app/shared/joI/src/data-presenter/presenter/presenter.component';
import { TemplateModel } from '../../models/template.model';
import { TemplateResource } from '../../resources/template.resource';
import { TemplateFacade } from '../../template.facade';

@Component({
  selector: 'template-name',
  templateUrl: './template-name.component.html',
  styleUrls: ['./template-name.component.scss'],
})
export class TemplateNameComponent implements OnInit, OnDestroy {
  @Input() template: TemplateResource;

  @ViewChild('templateNamePresenter') templateNamePresenter: PresenterComponent;
  templateNameEditMode: boolean = false;
  templateNameControl: FormControl;

  showDeleteModal: boolean = false;

  subscriptions$: Array<Subscription> = [];

  constructor(private _templateFacade: TemplateFacade) {}

  ngOnInit() {
    this.templateNameControl = new FormControl(this.template.name);
    this.templateNameControl.disable();
  }

  templateNameRequestEdit(ev): void {
    this.templateNameEditMode = ev;
    this.templateNamePresenter.toggleEdit(ev);
    if (ev == true) {
      this.templateNameControl.enable();
    } else {
      this.templateNameControl.disable();
      this.templateNameControl.setValue(this.template.name);
    }
  }
  onSaveTemplateName(e): void {
    if (this.templateNameControl.value != '') {
      this.subscriptions$.push(
        this._templateFacade
          .updateTemplate(this.template.id, {
            name: this.templateNameControl.value,
          } as TemplateModel)
          .subscribe()
      );
    } else {
      this.templateNameControl.setValue(this.template.name);
    }

    this.templateNameEditMode = false;
    this.templateNamePresenter.toggleEdit(false);
    this.templateNameControl.disable();
  }

  onDelete(): void {

    this.subscriptions$.push(
      this._templateFacade.removeTemplate(this.template.id).subscribe()
    )
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}
