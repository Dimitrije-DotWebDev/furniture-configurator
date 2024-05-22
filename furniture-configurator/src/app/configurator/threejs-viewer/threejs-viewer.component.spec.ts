import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreejsViewerComponent } from './threejs-viewer.component';

describe('ThreejsViewerComponent', () => {
  let component: ThreejsViewerComponent;
  let fixture: ComponentFixture<ThreejsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreejsViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreejsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
