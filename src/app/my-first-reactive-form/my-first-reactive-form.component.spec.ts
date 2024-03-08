import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstReactiveFormComponent } from './my-first-reactive-form.component';

describe('MyFirstReactiveFormComponent', () => {
  let component: MyFirstReactiveFormComponent;
  let fixture: ComponentFixture<MyFirstReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFirstReactiveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFirstReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
