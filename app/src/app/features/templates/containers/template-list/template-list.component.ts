import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DayType } from '../../enums/day-type.enum';
import { PlanModel } from '../../models/plan.mode';
import { TemplateModel } from '../../models/template.model';
import { TemplateResource } from '../../resources/template.resource';
import { TemplateFacade } from '../../template.facade';

@Component({
  selector: 'template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
})
export class TemplateListComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  templates: Array<TemplateResource>;

  subscriptions$: Array<Subscription> = [];

  constructor(private _templateFacade: TemplateFacade) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._templateFacade.loading$.subscribe((x) => (this.loading = x)),
      this._templateFacade.templates$.subscribe((x) => (this.templates = x)),
      this._templateFacade.loadTemplates().subscribe()
    );
  }

  creteDefaultTemplate(): void {
    const time = '12:45';

    let days = [
      DayType.saturday,
      DayType.sunday,
      DayType.monday,
      DayType.tuesday,
      DayType.wednesday,
      DayType.thursday,
      DayType.friday,
    ];

    let plans: Array<PlanModel> = [];

    days.forEach((x) => {
      let planModel: PlanModel = {
        days: [x],
        meals: [
          { name: 'وجبة الإفطار', time: this.makeDate('7:00') },
          { name: 'وجبة منتصف الصباح', time: this.makeDate('10:00') },
          { name: 'وجبة الغداء', time: this.makeDate('12:00') },
          { name: 'وجبة العشاء', time: this.makeDate('19:00') },
        ],
      };

      plans.push(planModel)
    });

    let model = {
      name: 'نموذج خطة الوجبات',
      plans: plans,
    } as TemplateModel;

    this.subscriptions$.push(
      this._templateFacade.createNewTemplate(model).subscribe()
    );
  }

  searchTemplate(key: string): void {
    this.subscriptions$.push(
      this._templateFacade.loadTemplates(key).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }

  private makeDate(time: string): Date {
    const current = new Date();
    const dateTimeTwo = new Date(
      `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()} ${time}`
    );

    return dateTimeTwo;
  }
}
