import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOrgComponent } from './agregar-org.component';

describe('AgregarOrgComponent', () => {
  let component: AgregarOrgComponent;
  let fixture: ComponentFixture<AgregarOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarOrgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
