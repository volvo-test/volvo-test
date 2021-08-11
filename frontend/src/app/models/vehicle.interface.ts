import { TypeVehicles } from './vehicle.type.enum';

export interface IVehicle {
  vehicle_id?: number;
  color?: string;
  number_passengers?: number;
  type?: TypeVehicles;
  series?: string;
  chassi_id?: string;
}
