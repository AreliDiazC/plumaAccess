import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrganizacionComponent } from './update-organizacion.component';

describe('UpdateOrganizacionComponent', () => {
  let component: UpdateOrganizacionComponent;
  let fixture: ComponentFixture<UpdateOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrganizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
