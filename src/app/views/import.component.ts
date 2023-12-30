import { Component, HostListener } from '@angular/core';
import { BigInputComponent } from '../components/big-input/big-input.component';
import { SharedModule } from '../components/shared.module';
import { DndDirective } from '../directives/dnd.directive';

@Component({
  selector: 'app-import',
  standalone: true,
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss',
  imports: [SharedModule, DndDirective],
})
export class ImportComponent {
  files: any[];

  constructor() {}

  onFileDropped(event) {
    console.log(event);
  }
}
