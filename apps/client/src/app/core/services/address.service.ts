import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Address,
  CreateAddressDto,
  UpdateAddressDto,
} from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'http://localhost:3000/addresses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }

  create(address: CreateAddressDto): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address);
  }

  update(id: string, address: UpdateAddressDto): Observable<Address> {
    return this.http.patch<Address>(`${this.apiUrl}/${id}`, address);
  }
}
