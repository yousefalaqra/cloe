import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/shared/clinet/client.service';
import { ClientFacade } from '../../../clients.facade';
import { MeasurementModel } from '../../../models/mesaurement.model';
import { ClientResource } from '../../../resources/client.resource';

@Component({
  selector: 'client-measurements',
  templateUrl: './client-measurements.component.html',
  styleUrls: ['./client-measurements.component.scss'],
})
export class ClientMeasurementsComponent implements OnInit, OnDestroy {
  csvRecords: any[] = [];
  measurementModel: MeasurementModel;

  client: ClientResource;

  subscriptions$: Array<Subscription> = [];

  measurementSetA: Array<{}> = [
    {key: "height", label: "طول القامة", unit: "سم"},
    {key: "wight", label: "الوزن", unit: "كغم"},
    {key: "waistHipRatio", label: "نسبة الخصر إلى الورك", unit: "%"},
  ]

  measurementSetB: Array<{}> = [
    {key: "bodyMassIndex", label: "مؤشر كتلة الجسم", unit: "كغم"},
    {key: "totalBodyWater", label: "مجموع الماء في الجسم", unit: "كغم"},
    {key: "caloriesIntake", label: "تناول السعرات الحرارية", unit: "كغم"},
    {key: "protien", label: "العضلات", unit: "كغم"},
    {key: "skeletalMuscleMass", label: "كتلة العضلات الهيكلية", unit: "كغم"},
    {key: "minerals", label: "المعادن", unit: "كغم"},
    {key: "fatOfRightArm", label: "دهون الذراع اليمنى", unit: "كغم"},
    {key: "fatOfLeftArm", label: "دهون الذراع اليسرى", unit: "كغم"},
    {key: "fatOfTruck", label: "دهن الجذع", unit: "كغم"},
    {key: "fatOfLeftLeg", label: "دهون الساق اليسرى", unit: "كغم"},
    {key: "fatOfRightLeg", label: "الدهون في الساق اليمنى", unit: "كغم"},
  ]

  activeMeasurement: {};

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private _clientService: ClientService,
    private _clientFacade: ClientFacade
  ) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._clientFacade.selectedClient$.subscribe((x) => (this.client = x)),
      this._clientFacade.activeMeasurement$.subscribe(x => {this.activeMeasurement = x}),
    );
  }

  fileChangeListener($event: any): void {
    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.subscriptions$.push(
      this.ngxCsvParser
        .parse(files[0], { header: true, delimiter: ',' })
        .pipe()
        .subscribe(
          (result: Array<any>) => {
            console.log('Result', result);
            this.csvRecords = result;

            let data = result[0];

            this.measurementModel = {
              bodyFatMass: Number(data['27. BFM (Body Fat Mass)']),
              bodyMassIndex: Number(data['36. BMI (Body Mass Index)']),
              caloriesIntake: Number(data['100. Recommended Calorie Intake']),
              date: new Date(Number(data['14. Test Date / Time'])),
              fatOfLeftArm: Number(data['44. FFM of Left Arm']),
              fatOfLeftLeg: Number(data['50. FFM of Left Leg']),
              fatOfRightArm: Number(data['42. FFM of Right Arm']),
              fatOfRightLeg: Number(data['48. FFM of Right Leg']),
              fatOfTruck: Number(data['50. FFM of Left Leg']),
              height: Number(data['3. Height']),
              minerals: Number(data['24. Minerals']),
              protien: Number(data['21. Protein']),
              skeletalMuscleMass: Number(
                data['33. SMM (Skeletal Muscle Mass)']
              ),
              totalBodyWater: Number(data['18. TBW (Total Body Water)']),
              wight: Number(data['15. Weight']),
              waistHipRatio: Number(data['68. WHR (Waist-Hip Ratio)']),
            };
            
            this.fileImportInput.nativeElement.value = null
            this._clientService.setShowMeasurementForm({
              show: true,
              isImport: true,
              model: this.measurementModel,
            });

          },
          (error: NgxCSVParserError) => {
            console.log('Error', error);
          }
        )
    );
  }

  onAddMeasurement(model: MeasurementModel): void {
    this.subscriptions$.push(
      this._clientFacade
        .addClientMeasurement(this.client.clientId, model)
        .subscribe()
    );
    this.client.clientMeasurements
  }

  onAdd(): void{
    this._clientService.setShowMeasurementForm({
      show: true,
      isImport: false,
    });
  }

  onActiveMeasurement(data: {}): void{
    this._clientFacade.setActiveMeasurement(data);
    let element = document.getElementById('scroll').scrollIntoView({behavior: 'smooth'})
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}
