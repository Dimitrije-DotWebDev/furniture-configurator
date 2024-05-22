import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumpsComponent } from './breadcrumps.component';

describe('BreadcrumpsComponent', () => {
  let component: BreadcrumpsComponent;
  let fixture: ComponentFixture<BreadcrumpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
