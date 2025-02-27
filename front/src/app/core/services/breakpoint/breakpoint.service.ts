import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject, Observable } from 'rxjs';
import {Article} from "../../../features/article/interfaces/article";
import {Topic} from "../../../features/topic/interfaces/topic";

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private isMobileSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private gridColNumber: BehaviorSubject<number> = new BehaviorSubject<number>(2);


  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobileSubject.next(result.matches);
        this.gridColNumber.next(result.matches ? 1 : 2)
      });

  }

  getIsMobile(): Observable<boolean> {
    return this.isMobileSubject.asObservable();
  }


  /**
   * Handle we have only one item to show
   * If wue have on item he takes all the space
   */
  gridBreakPoint(itemLength: Article[] | Topic[]): Observable<number> {
    if(itemLength.length === 1 ){
      this.gridColNumber.next( 1)
    }else{
      this.gridColNumber.next( 2)
    }
    return this.gridColNumber.asObservable()
  }
}
