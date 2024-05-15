import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlumaComponent } from './editar-pluma.component';

describe('EditarPlumaComponent', () => {
  let component: EditarPlumaComponent;
  let fixture: ComponentFixture<EditarPlumaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPlumaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPlumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
