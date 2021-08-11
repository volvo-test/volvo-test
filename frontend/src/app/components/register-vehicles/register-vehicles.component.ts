import { IVehicle } from './../../models/vehicle.interface';
import { VehiclesService } from './../../services/vehicles.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register-vehicles',
  templateUrl: './register-vehicles.component.html',
  styleUrls: ['./register-vehicles.component.css'],
})
export class RegisterVehiclesComponent implements OnInit {
  formRegister: FormGroup;
  formEdit: FormGroup;
  msgError: string | undefined;
  chassiId?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private service: VehiclesService
  ) {
    this.formRegister = this.fb.group({
      color: new FormControl(null, [Validators.required]),
      series: new FormControl(null, [Validators.required]),
      type: new FormControl('car', Validators.required),
    });

    this.formEdit = this.fb.group({
      color: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.chassiId = params['chassiId'];
    });
  }

  registerVehicle() {
    this.service.registerVehicle(this.populateData()).subscribe(
      () => {
        alert(`Registered with successful`);
        this.router.navigate(['/']);
      },
      (error) => (this.msgError = error)
    );
  }

  editVehicle() {
    this.service
      .editVehicle(this.chassiId, this.formEdit.get('color')?.value)
      .subscribe(
        () => {
          alert(`Updated with successful`);
          this.router.navigate(['/']);
        },
        (error) => (this.msgError = error)
      );
  }

  populateData() {
    const data = <IVehicle>{};
    data.color = this.formRegister.get('color')?.value;
    data.series = this.formRegister.get('series')?.value;
    data.type = this.formRegister.get('type')?.value;
    return data;
  }
}
