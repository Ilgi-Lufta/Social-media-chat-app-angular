import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyFirstComponent } from './edit-my-first.component';

describe('EditMyFirstComponent', () => {
  let component: EditMyFirstComponent;
  let fixture: ComponentFixture<EditMyFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyFirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMyFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
