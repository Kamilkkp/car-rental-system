import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateVehicleDto, PaginatedVehicles, UpdateVehicleDto, Vehicle } from '../models/vehicle.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/vehicles`;

  constructor(private http: HttpClient) { }

  getAll(page: number, limit: number): Observable<PaginatedVehicles> {
    return this.http.get<PaginatedVehicles>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
  getOne(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  create(vehicle: CreateVehicleDto): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

  update(id: string, vehicle: UpdateVehicleDto): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.apiUrl}/${id}`, vehicle);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}