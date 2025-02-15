import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleComponent } from './list-article.component';

describe('ListComponent', () => {
  let component: ListArticleComponent;
  let fixture: ComponentFixture<ListArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
