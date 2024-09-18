import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaImmagineComponent } from './visualizza-immagine.component';

describe('VisualizzaImmagineComponent', () => {
  let component: VisualizzaImmagineComponent;
  let fixture: ComponentFixture<VisualizzaImmagineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizzaImmagineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizzaImmagineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
