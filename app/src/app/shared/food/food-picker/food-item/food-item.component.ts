import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FoodItemModel } from 'src/app/features/food/models/food-item.model';
import { FoodItemResource } from 'src/app/features/food/resources/foodItem/food-item.resource';
import { UnitResource } from 'src/app/features/settings/resources/unit/unit.resource';

@Component({
  selector: 'food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
})
export class FoodItemComponent implements OnInit {
  @Input() item: FoodItemResource;
  @Input() units: Array<UnitResource>;

  @Output() onSelect = new EventEmitter<{ id: number; model: FoodItemModel }>();

  quantityControl: FormControl;

  selectedUnit;

  constructor() {}

  ngOnInit() {
    this.quantityControl = new FormControl(this.item.baseQuantity);
    this.selectedUnit = this.item.unit.id;
  }

  onSelectItem(): void {
    let model = {
      baseQuantity: this.quantityControl.value,
      unitId: this.selectedUnit,
      name: this.item.name,
    } as FoodItemModel;
    
    this.onSelect.emit({ id: this.item.id, model });
  }

  onUnitChange(unitId: string): void {}
}
