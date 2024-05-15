import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaOrganizacionInsertComponent } from './agrega-organizacion-insert.component';

describe('AgregaOrganizacionInsertComponent', () => {
  let component: AgregaOrganizacionInsertComponent;
  let fixture: ComponentFixture<AgregaOrganizacionInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaOrganizacionInsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregaOrganizacionInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
