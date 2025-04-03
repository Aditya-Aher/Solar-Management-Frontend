import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Visitor } from '../models/visitor.model';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private apiUrl = 'http://localhost:8080/api/visits';

  constructor(private http: HttpClient) {}

  getVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getVisitor(id: number): Observable<Visitor> {
    return this.http.get<Visitor>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createVisitor(visitor: Visitor): Observable<Visitor> {
    return this.http.post<Visitor>(this.apiUrl, visitor).pipe(
      catchError(this.handleError)
    );
  }

  updateVisitor(id: number, visitor: Visitor): Observable<Visitor> {
    return this.http.put<Visitor>(`${this.apiUrl}/${id}`, visitor).pipe(
      catchError(this.handleError)
    );
  }

  deleteVisitor(id: number): Observable<{ message: string }> {
    alert(typeof(id))
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    let errorMessage = 'Something went wrong! Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
