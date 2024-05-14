import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlumaComponent } from './list-pluma.component';

describe('ListPlumaComponent', () => {
  let component: ListPlumaComponent;
  let fixture: ComponentFixture<ListPlumaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlumaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPlumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
