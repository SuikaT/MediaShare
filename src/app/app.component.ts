import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DropAreaComponent } from 'ngx-dnd';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DropAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'MediaTransfer';
}
