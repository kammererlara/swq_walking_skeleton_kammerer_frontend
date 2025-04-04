import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RelocationRequestService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  submitRequest(requestData: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + '/requestForRelocationSupport',
      requestData,
    );
  }
}
