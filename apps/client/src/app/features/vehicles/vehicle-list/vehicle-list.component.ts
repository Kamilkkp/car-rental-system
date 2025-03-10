import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../core/services/vehicle.service';
import { PaginatedVehicles } from '../../../core/models/vehicle.model';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { RangePipe } from '../../../shared/pipes/range.pipe';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    RangePipe,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  paginatedData: PaginatedVehicles = {
    data: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 10
  };
  currentPage = 1;
  itemsPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50];

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  private loadVehicles(): void {
    this.vehicleService.getAll(this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {
        this.paginatedData = data;
      },
      error: (err) => console.error('Error loading vehicles:', err)
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadVehicles();
  }

  onItemsPerPageChange(event: MatSelectChange): void {
    this.itemsPerPage = event.value;
    this.currentPage = 1;
    this.loadVehicles();
  }

  deleteVehicle(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Czy na pewno chcesz usunąć pojazd?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.delete(id).subscribe(() => {
          this.loadVehicles();
        });
      }
    });
  }
}