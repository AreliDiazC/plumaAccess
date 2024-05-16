import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTipoOrgComponent } from './insert-tipo-org.component';

describe('InsertTipoOrgComponent', () => {
  let component: InsertTipoOrgComponent;
  let fixture: ComponentFixture<InsertTipoOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertTipoOrgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertTipoOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
