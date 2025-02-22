import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  standalone: false,
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  errorMessage!: string;
  statusCode!: number;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.statusCode = params['statusCode'] ?? '404';
      this.errorMessage = params['errorMessage'] ?? 'Page not found';
    });
  }

}
