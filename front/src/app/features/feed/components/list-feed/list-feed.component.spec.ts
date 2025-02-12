import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedComponent } from './list-feed.component';

describe('ListFeedComponent', () => {
  let component: ListFeedComponent;
  let fixture: ComponentFixture<ListFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
