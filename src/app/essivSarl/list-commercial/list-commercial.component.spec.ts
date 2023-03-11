import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommercialComponent } from './list-commercial.component';

describe('ListCommercialComponent', () => {
  let component: ListCommercialComponent;
  let fixture: ComponentFixture<ListCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCommercialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
