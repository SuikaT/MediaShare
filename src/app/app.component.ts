import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './views/header/header.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { MainContentComponent } from './views/main-content/main-content.component';
import { MediasService } from './services/medias.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(_medias: MediasService) {}
}
