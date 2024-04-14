import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './views/header/header.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { MainContentComponent } from './views/main-content/main-content.component';
import { MediasService } from './services/medias.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersistenceService } from './services/persistence.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, MainContentComponent, HttpClientModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private _medias: MediasService) {}

  ngOnInit(): void {
    this._medias.retrieveAllMedia();
  }
}
