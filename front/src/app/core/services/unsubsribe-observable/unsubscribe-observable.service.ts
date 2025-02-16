import {Observable, Subject, takeUntil} from "rxjs";
import {Injectable, OnDestroy} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class UnsubscribeObservableService implements OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  public readonly takeUntilDestroy = <T>(
    origin: Observable<T>
  ): Observable<T> => origin.pipe(takeUntil(this.unsubscribe$));

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
