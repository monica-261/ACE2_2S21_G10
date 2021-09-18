import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoAprobadosComponent } from './admin-no-aprobados.component';

describe('AdminNoAprobadosComponent', () => {
  let component: AdminNoAprobadosComponent;
  let fixture: ComponentFixture<AdminNoAprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNoAprobadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNoAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
