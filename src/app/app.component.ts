import { Component } from '@angular/core';
import {RelocationRequestFormComponent} from './relocation-request-form/relocation-request-form.component';


@Component({
  selector: 'app-root',
  imports: [RelocationRequestFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'swq_walking_skeleton_kammerer_frontend';
}
