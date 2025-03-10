import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand, CreateBrandDto, UpdateBrandDto } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'http://localhost:3000/brands';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  create(brand: CreateBrandDto): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  update(id: string, brand: UpdateBrandDto): Observable<Brand> {
    return this.http.patch<Brand>(`${this.apiUrl}/${id}`, brand);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}