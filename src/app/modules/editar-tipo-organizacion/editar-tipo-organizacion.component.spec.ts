import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoOrganizacionComponent } from './editar-tipo-organizacion.component';

describe('EditarTipoOrganizacionComponent', () => {
  let component: EditarTipoOrganizacionComponent;
  let fixture: ComponentFixture<EditarTipoOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTipoOrganizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarTipoOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
