import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  errorMessage!: string;
  statusCode!: number;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.statusCode = params['statusCode'] ?? '404';
      this.errorMessage = params['errorMessage'] ?? 'Page not found';
    });
  }

}
