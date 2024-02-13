import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MeasurementModel } from 'src/app/features/clients/models/mesaurement.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'measurement-form',
  templateUrl: './measurement-form.component.html',
  styleUrls: ['./measurement-form.component.scss'],
})
export class MeasurementFormComponent implements OnInit, OnDestroy {
  measurementForm: FormGroup;

  showForm: boolean;
  isImport: boolean;
  model: MeasurementModel;

  measurementDate: Date;

  subscriptions$: Array<Subscription> = [];

  @Output() onAdd = new EventEmitter<MeasurementModel>();

  constructor(
    private _fb: FormBuilder,
    private _ClientService: ClientService
  ) {}

  ngOnInit() {
    this.measurementForm = this._fb.group({
      height: [''],
      date: [''],
      wight: [''],
      waistHipRatio: [''],
      totalBodyWater: [''],
      protien: [''],
      bodyFatMass: [''],
      skeletalMuscleMass: [''],
      minerals: [''],
      fatOfRightArm: [''],
      fatOfLeftArm: [''],
      fatOfTruck: [''],
      fatOfLeftLeg: [''],
      fatOfRightLeg: [''],
      bodyMassIndex: [''],
      caloriesIntake: [''],
    });

    this.subscriptions$.push(
      this._ClientService.showMeasurementForm$.subscribe((x) => {
        this.isImport = x.isImport;
        (this.showForm = x.show), (this.model = x.model);

        if (x.isImport) {
          this.measurementForm.get('height').setValue(this.model.height);
          this.measurementForm.get('date').setValue(this.model.date);
          this.measurementForm
            .get('totalBodyWater')
            .setValue(this.model.totalBodyWater);
          this.measurementForm.get('protien').setValue(this.model.protien);
          this.measurementForm
            .get('bodyFatMass')
            .setValue(this.model.bodyFatMass);
          this.measurementForm.get('wight').setValue(this.model.wight);
          this.measurementForm
            .get('skeletalMuscleMass')
            .setValue(this.model.skeletalMuscleMass);
          this.measurementForm.get('minerals').setValue(this.model.minerals);
          this.measurementForm
            .get('fatOfRightArm')
            .setValue(this.model.fatOfRightArm);
          this.measurementForm
            .get('fatOfLeftArm')
            .setValue(this.model.fatOfLeftArm);
          this.measurementForm
            .get('fatOfTruck')
            .setValue(this.model.fatOfTruck);
          this.measurementForm
            .get('fatOfLeftLeg')
            .setValue(this.model.fatOfLeftLeg);
          this.measurementForm
            .get('fatOfRightLeg')
            .setValue(this.model.fatOfRightLeg);
          this.measurementForm
            .get('bodyMassIndex')
            .setValue(this.model.bodyMassIndex);
          this.measurementForm
            .get('caloriesIntake')
            .setValue(this.model.caloriesIntake);
          this.measurementForm
            .get('waistHipRatio')
            .setValue(this.model.waistHipRatio);

          this.measurementDate = this.model.date;
        }
      })
    );

    this.measurementDate = this.isImport ? this.model.date : null;
  }
  handleCancel(): void {
    this._ClientService.setShowMeasurementForm({
      show: false,
      isImport: false,
    });
  }

  onSubmit(): void {
    let model: MeasurementModel = {
      height: this.measurementForm.get('height').value,
      date: this.measurementForm.get('date').value,
      totalBodyWater: this.measurementForm.get('totalBodyWater').value,
      protien: this.measurementForm.get('protien').value,
      bodyFatMass: this.measurementForm.get('bodyFatMass').value,
      wight: this.measurementForm.get('wight').value,
      skeletalMuscleMass: this.measurementForm.get('skeletalMuscleMass').value,
      minerals: this.measurementForm.get('minerals').value,
      fatOfRightArm: this.measurementForm.get('fatOfRightArm').value,
      fatOfLeftArm: this.measurementForm.get('fatOfLeftArm').value,
      fatOfTruck: this.measurementForm.get('fatOfTruck').value,
      fatOfLeftLeg: this.measurementForm.get('fatOfLeftLeg').value,
      fatOfRightLeg: this.measurementForm.get('fatOfRightLeg').value,
      bodyMassIndex: this.measurementForm.get('bodyMassIndex').value,
      caloriesIntake: this.measurementForm.get('caloriesIntake').value,
      waistHipRatio: this.measurementForm.get('waistHipRatio').value,
    };

    this.onAdd.emit(model);

    this.handleCancel();
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}
