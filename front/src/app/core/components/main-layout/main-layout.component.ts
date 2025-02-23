import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../../features/auth/services/auth.service";
import {UnsubscribeObservableService} from "../../services/unsubsribe-observable/unsubscribe-observable.service";
import {BreakpointService} from "../../services/breakpoint/breakpoint.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  standalone: false
})
export class MainLayoutComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobile!: boolean;
  isCollapsed: boolean = true;
  isLoggedIn!: boolean;
  allowedNotLoginHeader: string[] = ['/register', '/login'];
  cantShowHeader: boolean = false;

  constructor(
    private unsubscribeObservable: UnsubscribeObservableService,
    private authService: AuthService,
    private router: Router,
    private breakpointService: BreakpointService,
  ) {
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.breakpointService.getIsMobile()
      .pipe(this.unsubscribeObservable.takeUntilDestroy)
      .subscribe((isMobile: boolean) => this.isMobile = isMobile);

    this.authService.isLoggedIn().pipe(
      this.unsubscribeObservable.takeUntilDestroy
    ).subscribe((login: boolean) => {
      this.isLoggedIn = login
    });

    this.router.events
      .pipe(this.unsubscribeObservable.takeUntilDestroy)
      .subscribe(() => {
        this.cantShowHeader = this.allowedNotLoginHeader.some(path => this.router.url.includes(path));
      });
  }

  OnClose(): void {
    this.sidenav.close();
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
