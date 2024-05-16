import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarQrComponent } from './mostrar-qr.component';

describe('MostrarQrComponent', () => {
  let component: MostrarQrComponent;
  let fixture: ComponentFixture<MostrarQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarQrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
