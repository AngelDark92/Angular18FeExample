import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCartelleComponent } from './lista-cartelle.component';

describe('ListaCartelleComponent', () => {
  let component: ListaCartelleComponent;
  let fixture: ComponentFixture<ListaCartelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCartelleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCartelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
