import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyFirstComponent } from './add-my-first.component';

describe('AddMyFirstComponent', () => {
  let component: AddMyFirstComponent;
  let fixture: ComponentFixture<AddMyFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMyFirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMyFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
