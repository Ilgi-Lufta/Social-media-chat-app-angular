import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaddComponent } from './postadd.component';

describe('PostaddComponent', () => {
  let component: PostaddComponent;
  let fixture: ComponentFixture<PostaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
