import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
 private url = 'https://localhost:7096/';
 private apiUrl = 'api/Estudiantes/'
  constructor(private http: HttpClient) 
  {

  }

  getListaEstudiantes(): Observable<any>
  {
    return this.http.get(this.url + this.apiUrl);
  }

  deleteEstudiante(id: number): Observable<any>
  {
    return this.http.delete(this.url + this.apiUrl + id);
  }

  addEstudiante(estudiante: any): Observable<any> 
  {
    return this.http.post(this.url + this.apiUrl, estudiante);
  }

  updateEstudiante (id: number, estudiante:any): Observable<any>
  {
    return this.http.put(this.url + this.apiUrl +id, estudiante);
  }
}
