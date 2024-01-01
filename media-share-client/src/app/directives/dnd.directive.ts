import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDnd]',
  standalone: true,
})
export class DndDirective {
  @Output('fileDropped')
  fileDropped = new EventEmitter<FileList>();

  constructor() {}

  @HostListener('dragover', ['$event'])
  onDragOver(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    dragEvent.stopPropagation();
    console.log('Drag over');
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    dragEvent.stopPropagation();

    console.log('Drag leave');
  }

  @HostListener('drop', ['$event'])
  onDrop(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    dragEvent.stopPropagation();
    console.log(dragEvent);
    const files = dragEvent.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
