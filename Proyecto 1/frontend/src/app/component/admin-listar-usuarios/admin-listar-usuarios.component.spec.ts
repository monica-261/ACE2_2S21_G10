import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListarUsuariosComponent } from './admin-listar-usuarios.component';

describe('AdminListarUsuariosComponent', () => {
  let component: AdminListarUsuariosComponent;
  let fixture: ComponentFixture<AdminListarUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListarUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
