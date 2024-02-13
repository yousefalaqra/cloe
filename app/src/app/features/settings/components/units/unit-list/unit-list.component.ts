import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UnitResource } from '../../../resources/unit/unit.resource';
import { UnitFacade } from '../../../unit.facade';
import {ColumnItem} from '../../../resources/columnType';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddUnitComponent } from '../add-unit/add-unit.component';
import { LanguageServiceService } from 'src/app/core/languageService/language-service.service';
@Component({
  selector: 'unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit, OnDestroy {
  isArabic: boolean;
  translateData;
  unitItems$: Observable<Array<UnitResource>>;
  loadUnitItemsSubscirption$: Subscription;
  unitItem : UnitResource[] =[];
  listOfColumns: ColumnItem[] = [];
  oldAction :number =0 ;
  constructor(private unitsFacade: UnitFacade, private modal: NzModalService, 
    private viewContainerRef: ViewContainerRef,public langugaeService: LanguageServiceService){
      langugaeService.isArabic.subscribe(e => { this.isArabic = e });
        langugaeService.data.subscribe(e => { this.translateData = e ;});
    }
  ngOnInit() : void {
    this.langugaeService.isArabic.subscribe(e => { this.isArabic = e });
    this.langugaeService.data.subscribe(e => { this.translateData = e;
      this.listOfColumns= [
      
        {
        
         name: this.translateData.unitColCode,
          sortOrder: null,
          sortFn: (a: UnitResource, b: UnitResource) => a.code.localeCompare(b.code),
          sortDirections: ['ascend', 'descend', null],
        },
        {
          name: this.translateData.unitColGramsRatio,
          sortOrder: null,
          sortFn: (a: UnitResource, b: UnitResource) => a.gramsRatio - b.gramsRatio,
          sortDirections: ['ascend', 'descend', null],
        
        },
        {
          name: this.translateData.liquid,
          sortOrder: null,
          sortFn:null,
          sortDirections: ['ascend', 'descend', null],
        
        }
      ]; });
    this.loadUnitItemsSubscirption$ = this.unitsFacade.loadUnits().subscribe(e=> {
      this.unitsFacade.units$.subscribe(units => {
        this.unitItem  = units;
        this.unitItem.sort( function  (firstEl, secondEl)   
        { return secondEl.id - firstEl.id;}
       );
        this.unitItem.forEach(element => {
          element.action = false;
        });
      });
    });
    

 
}

  addNewUnit(): void {
    const modal = this.modal.create({
      nzTitle: this.translateData.addUnit,
      nzClassName: this.isArabic? 'ArabicFont' :'EnglishFont',
      nzDirection : this.isArabic ? "rtl" : "ltr",
      nzContent: AddUnitComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        unitValue : null,
        editMode:false
      },
      nzFooter: [
     
      ]
    });
    const instance = modal.getContentComponent();
    modal.afterClose.subscribe(); 
  }

  editUnit(unit:UnitResource): void {
    console.log(unit);
    const modal = this.modal.create({
      nzTitle: this.translateData.editUnit,
      nzClassName: this.isArabic? 'ArabicFont' :'EnglishFont',
      nzDirection : this.isArabic ? "rtl" : "ltr",
      nzContent: AddUnitComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        unitValue : unit,
        editMode:true
      },
      nzFooter: [
     
      ]
    });
    const instance = modal.getContentComponent();
    console.log(instance);
    modal.afterClose.subscribe();
  }


  ngOnDestroy(): void {
    this.loadUnitItemsSubscirption$.unsubscribe();
  }

  showDeleteConfirm(unit:UnitResource): void {
    this.modal.confirm({
      nzTitle: this.translateData.confirmDelete,
      nzClassName: this.isArabic? 'ArabicFont' :'EnglishFont',
      nzDirection : this.isArabic ? "rtl" : "ltr",
    //  nzContent: '<b style="color: red;"></b>',
      nzOkText: this.translateData.yes,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>{this.unitsFacade.deleteUnit(unit) ; this.oldAction = 0},
      nzCancelText: this.translateData.no,
      nzOnCancel: () => this.modal.closeAll()
    });
  }
  showSetting(event){
    var index  =event.currentTarget.attributes[2].nodeValue;   
    this.unitItem[Number(index)].action = true;
  }
  turnOffAction(event){
    var index  =event.currentTarget.attributes[2].nodeValue;   
    this.unitItem[Number(index)].action = false;
  }
}
