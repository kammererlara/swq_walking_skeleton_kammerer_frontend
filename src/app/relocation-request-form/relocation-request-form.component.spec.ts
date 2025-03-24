import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelocationRequestFormComponent } from './relocation-request-form.component';
import { RelocationRequestService } from '../relocation-request.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('RelocationRequestFormComponent', () => {
  let component: RelocationRequestFormComponent;
  let fixture: ComponentFixture<RelocationRequestFormComponent>;
  let mockRelocationRequestService: jasmine.SpyObj<RelocationRequestService>;

  beforeEach(async () => {
    mockRelocationRequestService = jasmine.createSpyObj('RelocationRequestService', ['submitRequest']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, RelocationRequestFormComponent],
      providers: [{ provide: RelocationRequestService, useValue: mockRelocationRequestService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RelocationRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should reset fields and show success message when request succeeds', async () => {
    mockRelocationRequestService.submitRequest.and.returnValue(of({ status: 200 }));

    component.relocationRequestForm = {
      name: 'Max Mustermann',
      datetime: '2025-04-01T08:00',
      fromLocation: 'Wien',
      toLocation: 'Graz',
      floor: 3,
      elevator: true,
      packagingService: true,
    };

    component.onSubmit();

    expect(mockRelocationRequestService.submitRequest).toHaveBeenCalledWith(component.relocationRequestForm);

    expect(component.relocationRequestForm).toEqual({
      name: '',
      datetime: '',
      fromLocation: '',
      toLocation: '',
      floor: '',
      elevator: false,
      packagingService: false,
    });

    expect(component.message).toBe('Request for relocation support successfully created!');
  });

  it('should keep fields and show error message when request fails', async () => {
    mockRelocationRequestService.submitRequest.and.returnValue(throwError(() => new Error('Network Error')));

    component.relocationRequestForm = {
      name: 'Max Mustermann',
      datetime: '2025-04-01T08:00',
      fromLocation: 'Wien',
      toLocation: 'Graz',
      floor: 3,
      elevator: true,
      packagingService: true,
    };

    component.onSubmit();

    expect(mockRelocationRequestService.submitRequest).toHaveBeenCalledWith(component.relocationRequestForm);

    expect(component.relocationRequestForm).toEqual({
      name: 'Max Mustermann',
      datetime: '2025-04-01T08:00',
      fromLocation: 'Wien',
      toLocation: 'Graz',
      floor: 3,
      elevator: true,
      packagingService: true,
    });

    expect(component.message).toBe('Fehler: Bitte versuchen Sie es erneut.');
  });
});
