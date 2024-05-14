import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOrganizacionComponent } from './tipo-organizacion.component';

describe('TipoOrganizacionComponent', () => {
  let component: TipoOrganizacionComponent;
  let fixture: ComponentFixture<TipoOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoOrganizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
