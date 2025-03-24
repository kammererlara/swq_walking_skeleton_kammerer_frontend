import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelocationRequestService {

  constructor() { }

  submitRequest(request: any): Observable<any> {
    return new Observable(observer => {
      observer.complete();
    });
  }
}
