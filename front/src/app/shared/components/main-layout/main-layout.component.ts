import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatNavList} from "@angular/material/list";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {AuthService} from "../../../features/auth/services/auth.service";
import {
    UnsubscribeObservableService
} from "../../../core/services/unsubsribe-observable/unsubscribe-observable.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-main-layout',
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
        RouterLinkActive,
        AsyncPipe
    ],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss',
    standalone: true
})
export class MainLayoutComponent implements OnInit {
    @ViewChild(MatSidenav) sidenav!: MatSidenav;
    isMobile = true;
    isCollapsed = true;
    isLoggedIn$!: Observable<boolean>;
    allowedNotLoginHeader: string[] = ['/register', '/login'];
    cantShowHeader: boolean = false;

    constructor(
        private unsubscribeObservable: UnsubscribeObservableService,
        private authService: AuthService,
        private breakpointObserver: BreakpointObserver,
        private router: Router) {
    }

    goHome(): void {
        this.router.navigate(['/']);
    }

    ngOnInit() {
        this.breakpointObserver.observe([Breakpoints.Handset])
            .pipe(this.unsubscribeObservable.takeUntilDestroy)
            .subscribe(result => {
                this.isMobile = result.matches;
            });

        this.isLoggedIn$ = this.authService.isLoggedIn().pipe(
            this.unsubscribeObservable.takeUntilDestroy
        );

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
