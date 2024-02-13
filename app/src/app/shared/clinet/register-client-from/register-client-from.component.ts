import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Gender } from 'src/app/features/clients/enums/gender.enum';
import { ClientModel } from 'src/app/features/clients/models/client.model';
import { ClientService } from '../client.service';
import { UniquePhoneNumberValidator } from '../services/validators.service';

@Component({
  selector: 'register-client-from',
  templateUrl: './register-client-from.component.html',
  styleUrls: ['./register-client-from.component.scss'],
})
export class RegisterClientFromComponent implements OnInit, OnDestroy {
  watchRegistration: boolean;
  lang: 'ar' | 'en';
  add: boolean;

  birthDate: Date;

  selectedGender: string = '1';

  selectedWorkPlace: string[] = ["1"];

  subscriptions: Array<Subscription> = [];

  clientForm: FormGroup;

  isValid: boolean;

  @Output('onAdd') clientModel = new EventEmitter<ClientModel>();

  constructor(
    private _clientService: ClientService,
    private customerValidator: UniquePhoneNumberValidator,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this._clientService.loadWorkplaces().subscribe(),
      this._clientService.watchRegistrationForm$.subscribe((x) => {
        this.watchRegistration = x.show;
        this.lang = x.lang;
        this.add = x.add;
      })
    );

    this.clientForm = this._fb.group({
      fullName: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.minLength(9)],
        this.customerValidator.validate,
        { updateOn: 'blur' },
      ],
      extension: ['970', [Validators.required, Validators.maxLength(3)]],
    });
  }

  handleOk(): void {
    if (this.clientForm.invalid || this.selectedWorkPlace.length < 1) return;

    let workplacesIds = this.selectedWorkPlace.map((x) => Number(x));
    console.log('Button ok clicked!');
    let clientModel = {
      createdAt: new Date(Date.now()),
      createdBy: 'Development',
      birthDate: this.birthDate,
      isActive: false,
      fullName: this.fullName.value,
      gender: this.selectedGender == '1' ? Gender.female : Gender.male,
      phoneNumber: `+${this.clientForm.get('extension').value}${
        this.phoneNumber.value
      }`,
      workPlacesIds: workplacesIds,
    } as ClientModel;

    this.clientModel.emit(clientModel);
    this.reset();
    this._clientService.closeRegistrationModal();
  }

  onWorkplaceChange(workplacesIds): void {
    this.selectedWorkPlace = [...workplacesIds];
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.reset();
    this._clientService.closeRegistrationModal();
  }

  checkValid() {
    if (this.clientForm.valid && this.birthDate) this.isValid = true;
    if (!this.clientForm.valid || !this.birthDate) this.isValid = false;
  }

  onPhoneExtension(value: string): void {
    this.extension.setValue(value);
  }

  get fullName() {
    return this.clientForm.get('fullName');
  }

  get phoneNumber() {
    return this.clientForm.get('phoneNumber');
  }

  get extension() {
    return this.clientForm.get('extension');
  }

  private reset() {
    this.extension.setValue('970');
    this.phoneNumber.setValue('');
    this.fullName.setValue('');
    this.birthDate = null;
    this.selectedWorkPlace = ['1'];
    this.selectedGender = '1';
  }

  onGender(value: any): void {
    this.selectedGender = value;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
