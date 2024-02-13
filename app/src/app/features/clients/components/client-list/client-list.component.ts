import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DayType } from 'src/app/features/templates/enums/day-type.enum';
import { PlanModel } from 'src/app/features/templates/models/plan.mode';
import { TemplateModel } from 'src/app/features/templates/models/template.model';
import { ClientFacade } from '../../clients.facade';
import { ClientModel } from '../../models/client.model';
import { ClientResource } from '../../resources/client.resource';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  lang: 'ar' | 'en';

  clients: Array<ClientResource>;
  loading: boolean = true;

  searchControl = new FormControl('');

  constructor(private _clientFacade: ClientFacade, private _router: Router) {}

  ngOnInit() {
    this.subscriptions.push(
      this.searchControl.valueChanges.subscribe((searchKye) => {
        this.subscriptions.push(
          this._clientFacade.loadClients(0, searchKye).subscribe()
        );
      }),
      this._clientFacade.lang$.subscribe((x) => (this.lang = x)),
      this._clientFacade.clients$.subscribe((x) => (this.clients = x)),
      this._clientFacade.loading$.subscribe((x) => (this.loading = x)),
      this._clientFacade.loadClients().subscribe()
    );
  }

  onAdd(): void {
    this._clientFacade.onClientAdd(this.lang);
  }

  onSaveClinet(clientModel: ClientModel): void {
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

      plans.push(planModel);
    });

    let model = {
      name: 'نموذج خطة الوجبات',
      plans: plans,
    } as TemplateModel;

    clientModel.template = model;
    this.subscriptions.push(
      this._clientFacade.addClient(clientModel).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  onSelectClient(client: ClientResource): void {
    this._router.navigate([
      `client/profile/${client.clientId}/${client.templateId}`,
    ]);
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
