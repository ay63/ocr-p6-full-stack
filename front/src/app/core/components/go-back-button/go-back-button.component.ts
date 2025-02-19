import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-go-back-button',
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './go-back-button.component.html',
  styleUrl: './go-back-button.component.scss',
  standalone: true
})
export class GoBackButtonComponent {

  goBack(): void {
    window.history.back();
  }
}
