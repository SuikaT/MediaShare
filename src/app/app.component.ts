import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ImportComponent } from './views/import.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'MediaTransfer';
}
