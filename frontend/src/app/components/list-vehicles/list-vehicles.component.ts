import { IVehicle } from './../../models/vehicle.interface';
import { VehiclesService } from './../../services/vehicles.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.css'],
})
export class ListVehiclesComponent implements OnInit {
  modalRef?: BsModalRef;
  vehicles?: IVehicle[];

  chassi_id = '';
  isLoading = true;
  isError = false;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private vehiclesService: VehiclesService
  ) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.vehiclesService
      .getVehicles()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: IVehicle[]) => {
          this.vehicles = res;
        },
        () => this.handleError()
      );
  }

  registerVehicle() {
    this.router.navigateByUrl('/register');
  }

  openModal(template: TemplateRef<any>, chassiId: any) {
    this.chassi_id = chassiId;
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef?.hide();
  }

  editVehicle(chassiId: any) {
    this.router.navigate(['/register'], {
      queryParams: { chassiId: chassiId },
    });
  }

  deleteVehicle() {
    this.vehiclesService.deleteVehicle(this.chassi_id).subscribe(
      (res) => {
        this.closeModal();
        this.getVehicles();
      },
      () => this.handleError()
    );
  }

  handleError() {
    this.isLoading = false;
    this.isError = true;
  }
}
