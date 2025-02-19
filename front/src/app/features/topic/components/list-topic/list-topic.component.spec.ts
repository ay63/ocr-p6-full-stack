import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTopicComponent } from './list-topic.component';

describe('ListSubjectComponent', () => {
  let component: ListTopicComponent;
  let fixture: ComponentFixture<ListTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTopicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
