import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Dinosaur } from '../models/dinosaur.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DinosaurService {
  private apiUrl = `${environment.apiUrl}/dinosaurs`;

  constructor(private http: HttpClient) { }

  getDinosaurs(): Observable<Dinosaur[]> {
    return this.http.get<Dinosaur[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getDinosaur(id: number): Observable<Dinosaur> {
    return this.http.get<Dinosaur>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createDinosaur(dinosaur: Dinosaur): Observable<Dinosaur> {
    return this.http.post<Dinosaur>(this.apiUrl, dinosaur)
      .pipe(catchError(this.handleError));
  }

  updateDinosaur(id: number, dinosaur: Dinosaur): Observable<Dinosaur> {
    return this.http.put<Dinosaur>(`${this.apiUrl}/${id}`, dinosaur)
      .pipe(catchError(this.handleError));
  }

  deleteDinosaur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 404:
          errorMessage = 'Dinosaurio no encontrado';
          break;
        case 500:
          errorMessage = 'Error del servidor';
          break;
        case 0:
          errorMessage = 'No se pudo conectar con el servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
