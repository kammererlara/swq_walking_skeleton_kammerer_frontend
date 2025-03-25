import { Component } from '@angular/core';
import { RelocationRequestService } from '../relocation-request.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-relocation-request-form',
  templateUrl: './relocation-request-form.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./relocation-request-form.component.css']
})
export class RelocationRequestFormComponent {
  relocationRequestForm = {
    name: '',
    datetime: '',
    fromLocation: '',
    toLocation: '',
    floor: '',
    elevator: false,
    packagingService: false,
  };

  message: string = '';

  constructor(private relocationRequestService: RelocationRequestService) {}

  onSubmit() {
    this.relocationRequestService.submitRequest(this.relocationRequestForm).subscribe({
      next: () => {
        this.message = 'Request for relocation support successfully created!';
        this.resetForm();
      },
      error: () => {
        this.message = 'Fehler: Bitte versuchen Sie es erneut.';
      }
    });
  }

  resetForm() {
    this.relocationRequestForm = {
      name: '',
      datetime: '',
      fromLocation: '',
      toLocation: '',
      floor: '',
      elevator: false,
      packagingService: false,
    };
  }
}
