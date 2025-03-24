import { Component } from '@angular/core';

@Component({
  selector: 'app-relocation-request-form',
  imports: [],
  templateUrl: './relocation-request-form.component.html',
  styleUrl: './relocation-request-form.component.css'
})
export class RelocationRequestFormComponent {
  relocationRequestForm: any;
  message: string = '';

  constructor() {}

  onSubmit() {
    console.log('Form submitted');
  }
}
