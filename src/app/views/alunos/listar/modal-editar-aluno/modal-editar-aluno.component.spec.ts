import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAlunoComponent } from './modal-editar-aluno.component';

describe('ModalEditarAlunoComponent', () => {
  let component: ModalEditarAlunoComponent;
  let fixture: ComponentFixture<ModalEditarAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
