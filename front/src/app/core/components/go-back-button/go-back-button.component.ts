import {Component} from '@angular/core';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrl: './go-back-button.component.scss',
  standalone: false
})
export class GoBackButtonComponent {

  goBack(): void {
    window.history.back();
  }
}
