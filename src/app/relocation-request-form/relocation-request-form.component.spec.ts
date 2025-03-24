import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelocationRequestFormComponent } from './relocation-request-form.component';

describe('RelocationRequestFormComponent', () => {
  let component: RelocationRequestFormComponent;
  let fixture: ComponentFixture<RelocationRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelocationRequestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelocationRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
