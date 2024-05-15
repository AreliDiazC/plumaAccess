import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCodigoComponent } from './list-codigo.component';

describe('ListCodigoComponent', () => {
  let component: ListCodigoComponent;
  let fixture: ComponentFixture<ListCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCodigoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
