import {UnsubscribeObservableService} from "./unsubscribe-observable.service";
import {TestBed} from "@angular/core/testing";

describe('unsubscribeObservableService', () => {
  let service: UnsubscribeObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsubscribeObservableService],
    });
    service = TestBed.inject(UnsubscribeObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

