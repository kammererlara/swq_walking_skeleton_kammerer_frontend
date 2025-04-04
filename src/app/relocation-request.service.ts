import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RelocationRequest } from './relocation-request.model';

@Injectable({
  providedIn: 'root',
})
export class RelocationRequestService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  submitRequest(requestData: RelocationRequest): Observable<RelocationRequest> {
    return this.http.post<RelocationRequest>(
      this.apiUrl + '/requestForRelocationSupport',
      requestData,
    );
  }
}
