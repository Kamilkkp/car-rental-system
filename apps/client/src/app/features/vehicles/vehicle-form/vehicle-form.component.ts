import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { BrandService } from '../../../core/services/brand.service';
import { AddressService } from '../../../core/services/address.service';
import { Brand } from '../../../core/models/brand.model';
import { Address, CreateAddressDto } from '../../../core/models/address.model';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
  vehicleForm: FormGroup;
  isEditMode = false;
  brands: Brand[] = [];
  addresses: Address[] = [];
  vehicleId?: string;
  isAddressEditMode = false;
  isCreateNewAddressEditMode = false;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private brandService: BrandService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.vehicleForm = this.fb.group({
      brand: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      vin: [
        '',
        [
          Validators.required,
          Validators.minLength(17),
          Validators.maxLength(17),
        ],
      ],
      isRented: [false],
      address: this.fb.group({
        _id: null,
        name: [''],
        surname: [''],
        street: [''],
        city: [''],
        zipCode: [''],
        country: [''],
        email: [''],
      }),
    });
  }

  ngOnInit(): void {
    this.loadBrands();
    this.loadAddresses();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.vehicleId = params['id'];
        this.loadVehicleData();
      }
    });
  }

  private loadBrands(): void {
    this.brandService.getAll().subscribe({
      next: (brands) => (this.brands = brands),
      error: (err) => console.error('Błąd ładowania marek:', err),
    });
  }

  private loadAddresses(): void {
    this.addressService.getAll().subscribe((addresses) => {
      this.addresses = addresses;
    });
  }

  private loadVehicleData(): void {
    if (this.vehicleId) {
      this.vehicleService.getOne(this.vehicleId).subscribe((vehicle) => {
        this.vehicleForm.patchValue({
          brand: vehicle.brand._id,
          registrationNumber: vehicle.registrationNumber,
          vin: vehicle.vin,
          isRented: vehicle.isRented,
          address: vehicle.address,
        });
      });
    }
  }

  private loadAddressData(address: Address): void {
    this.vehicleForm.patchValue(address);
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const vehicleData = this.vehicleForm.value;
      vehicleData.address = vehicleData.address?._id;

      if (this.isEditMode && this.vehicleId) {
        this.vehicleService
          .update(this.vehicleId, vehicleData as UpdateVehicleDto)
          .subscribe(() => this.router.navigate(['/vehicles']));
      } else {
        this.vehicleService
          .create(vehicleData as CreateVehicleDto)
          .subscribe(() => this.router.navigate(['/vehicles']));
      }
    }
  }

  onAddressSelect(address: Address): void {
    this.loadAddressData(address);
  }

  enableAddressEditMode() {
    this.isAddressEditMode = true;
  }

  disableAddressEditMode() {
    this.isAddressEditMode = false;
  }

  enableCreateNewAddressEditMode() {
    this.isCreateNewAddressEditMode = true;
  }

  disableCreateNewAddressEditMode() {
    this.isCreateNewAddressEditMode = false;
  }

  createNewAddress() {
    this.disableCreateNewAddressEditMode();

    if (this.vehicleForm.valid) {
      const addressData: CreateAddressDto =
        this.vehicleForm.get('address')?.value;

      this.addressService
        .create(addressData)
        .subscribe((address: Address) =>
          this.vehicleForm.patchValue({ address })
        );

      console.log('createNewAddress');
    }
  }

  updateAddress() {
    this.disableAddressEditMode();

    if (this.vehicleForm.valid) {
      const { _id, ...addressData } =
        this.vehicleForm.get('address')?.value || {};

      this.addressService
        .update(_id, addressData)
        .subscribe((address: Address) =>
          this.vehicleForm.patchValue({ address })
        );

      console.log('updateAddress');
    }
  }

  saveAsNewAddress() {
    this.disableAddressEditMode();

    if (this.vehicleForm.valid) {
      const addressData = { ...this.vehicleForm.get('address')?.value };
      delete addressData._id;

      this.addressService
        .create(addressData)
        .subscribe((address: Address) =>
          this.vehicleForm.patchValue({ address })
        );

      console.log('saveAsNewAddress');
    }
  }

  cancel(){
    this.vehicleForm.reset();
    
    this.disableAddressEditMode();
    this.disableCreateNewAddressEditMode();
  }
}
