import {
  Directive,
  EventEmitter,
  Output,
  HostListener,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[catDragDrop]',
})
export class DragDropFileUploadDirective {
  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') private background = 'transparent';
  // Dragover Event
  @HostListener('dragover', ['$event']) dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = document.querySelector('main').classList.contains('dark')
      ? 'rgba(0,0,0,.3)'
      : 'rgba(0,0,0,.1)';
  }
  // Dragleave Event
  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = 'transparent';
  }
  // Drop Event
  @HostListener('drop', ['$event']) public drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = 'transparent';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
