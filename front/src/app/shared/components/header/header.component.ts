import {Component, OnInit, ViewChild} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatNavList} from "@angular/material/list";
import {NgIf} from "@angular/common";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {AuthService} from "../../../features/auth/services/auth.service";
import {
  UnsubscribeObservableService
} from "../../../core/services/unsubsribe-observable/unsubscribe-observable.service";

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIcon,
    MatButton,
    MatIconButton,
    RouterLink,
    MatSidenavContainer,
    MatNavList,
    RouterOutlet,
    MatSidenavContent,
    MatSidenav,
    NgIf,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  isLoggedIn = false;
  allowedNotLoginHeader: string[] = ['/register', '/login']
  cantShowHeader: boolean = false;

  constructor(
    private unsubscribeObservable: UnsubscribeObservableService,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private router: Router) {
  }

  goHome(): void {
    this.router.navigate(['/feed'])
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(this.unsubscribeObservable.takeUntilDestroy)
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    this.router.events
      .pipe(this.unsubscribeObservable.takeUntilDestroy)
      .subscribe(() => {
        this.cantShowHeader = this.allowedNotLoginHeader.includes(this.router.url)
      });

    this.isLoggedIn = this.authService.isAuthentication()
  }

  OnClose(): void {
    this.sidenav.close()
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
