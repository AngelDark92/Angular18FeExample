import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNonEsistenteComponent } from './pagina-non-esistente.component';

describe('PaginaNonEsistenteComponent', () => {
  let component: PaginaNonEsistenteComponent;
  let fixture: ComponentFixture<PaginaNonEsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNonEsistenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaNonEsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
