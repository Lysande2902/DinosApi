import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../shared/material.module';
import { DinosaurService } from '../../../core/services/dinosaur.service';
import { Dinosaur } from '../../../core/models/dinosaur.model';
import { DinosaurFormDialog } from '../dinosaur-form-dialog/dinosaur-form-dialog';
import { ConfirmDeleteDialog } from '../confirm-delete-dialog/confirm-delete-dialog';

@Component({
  selector: 'app-dinosaur-list',
  imports: [CommonModule, MaterialModule],
  templateUrl: './dinosaur-list.html',
  styleUrl: './dinosaur-list.scss',
})
export class DinosaurList implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'species', 'period', 'diet', 'length', 'weight', 'actions'];
  dataSource = new MatTableDataSource<Dinosaur>();
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dinosaurService: DinosaurService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Cargar después de que la vista se inicialice
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadDinosaurs();
  }

  loadDinosaurs(): void {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.dinosaurService.getDinosaurs().subscribe({
      next: (dinosaurs) => {
        this.dataSource.data = dinosaurs;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.showError(error.message);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private updateDataSource(data: Dinosaur[]): void {
    this.dataSource.data = data;
    // Reconectar el paginador para asegurar que funcione correctamente
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DinosaurFormDialog, {
      width: '600px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dinosaurService.createDinosaur(result).subscribe({
          next: (newDinosaur) => {
            const currentData = this.dataSource.data;
            this.updateDataSource([...currentData, newDinosaur]);
            this.showSuccess('Dinosaurio agregado exitosamente');
          },
          error: (error) => {
            this.showError(error.message);
          }
        });
      }
    });
  }

  openEditDialog(dinosaur: Dinosaur): void {
    const dialogRef = this.dialog.open(DinosaurFormDialog, {
      width: '600px',
      data: dinosaur
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && dinosaur.id) {
        this.dinosaurService.updateDinosaur(dinosaur.id, result).subscribe({
          next: (updatedDinosaur) => {
            const currentData = this.dataSource.data;
            const index = currentData.findIndex(d => d.id === dinosaur.id);
            if (index !== -1) {
              currentData[index] = updatedDinosaur;
              this.updateDataSource([...currentData]);
            }
            this.showSuccess('Dinosaurio actualizado exitosamente');
          },
          error: (error) => {
            this.showError(error.message);
          }
        });
      }
    });
  }

  confirmDelete(dinosaur: Dinosaur): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '400px',
      data: { name: dinosaur.name }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed && dinosaur.id) {
        this.dinosaurService.deleteDinosaur(dinosaur.id).subscribe({
          next: () => {
            const currentData = this.dataSource.data;
            this.updateDataSource(currentData.filter(d => d.id !== dinosaur.id));
            this.showSuccess('Dinosaurio eliminado exitosamente');
          },
          error: (error) => {
            this.showError(error.message);
          }
        });
      }
    });
  }
}
