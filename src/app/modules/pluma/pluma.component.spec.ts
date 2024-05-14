import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlumaComponent } from './pluma.component';

describe('PlumaComponent', () => {
  let component: PlumaComponent;
  let fixture: ComponentFixture<PlumaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlumaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
