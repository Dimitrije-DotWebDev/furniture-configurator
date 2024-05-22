import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelListComponent } from './model-list.component';

describe('ModelListComponent', () => {
  let component: ModelListComponent;
  let fixture: ComponentFixture<ModelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
