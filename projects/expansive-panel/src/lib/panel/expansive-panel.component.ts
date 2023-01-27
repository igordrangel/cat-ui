import { Component, ElementRef, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cat-expansive-panel',
  templateUrl: './expansive-panel.component.html',
  styleUrls: ['./expansive-panel.component.css'],
})
export class ExpansivePanelComponent implements OnChanges {
  @Input() disabled = false;
  @Input() expanded = false;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngOnChanges(): void {
    if (this.expanded) {
      this.toggle();
    }
  }

  toggle() {
    if (!this.disabled || this.expanded) {
      this.removeActiveTabs();
      this.toggleThisTab();
    }
  }

  private toggleThisTab() {
    this.element.nativeElement.children.item(0).classList.toggle('active');
    this.element.nativeElement.children.item(1).classList.toggle('active');
  }

  private getTabs() {
    return this.element.nativeElement.parentElement.children;
  }

  private removeActiveTabs() {
    if (
      !this.element.nativeElement.parentElement.classList.contains('multiple')
    ) {
      const tabs = this.getTabs();

      for (let t = 0; t < tabs.length; t++) {
        if (tabs.item(t) !== this.element.nativeElement) {
          tabs.item(t).children.item(0).classList.remove('active');
          tabs.item(t).children.item(1).classList.remove('active');
        }
      }
    }
  }
}
