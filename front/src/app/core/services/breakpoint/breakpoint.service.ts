import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService  {
  private destroy$:Subject<void> = new Subject<void>();
  private isMobileSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isMobileSubject.next(result.matches);
      });
  }

  getIsMobile(): Observable<boolean> {
    return this.isMobileSubject.asObservable();
  }

}
