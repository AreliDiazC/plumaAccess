import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCodigoComponent } from './editar-codigo.component';

describe('EditarCodigoComponent', () => {
  let component: EditarCodigoComponent;
  let fixture: ComponentFixture<EditarCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCodigoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
