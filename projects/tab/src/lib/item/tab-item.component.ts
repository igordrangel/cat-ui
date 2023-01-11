import { Component, ElementRef, Input, ComponentRef, Inject, ChangeDetectorRef, ViewRef } from '@angular/core';

@Component({
  selector: 'cat-tab[label]',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.css'],
})
export class TabItemComponent {
  @Input() label: string;
  @Input() active?: boolean = false;

  constructor(private element: ElementRef<HTMLElement>) {}

  toggle() {
    this.removeActiveTabs();
    this.activeThisTab();
  }

  private activeThisTab() {
    this.element.nativeElement.children.item(0).classList.add('active');
    this.element.nativeElement.children.item(1).classList.add('active');
  }

  private getTabs() {
    return this.element.nativeElement.parentElement.children;
  }

  private removeActiveTabs() {
    const tabs = this.getTabs();

    for (let t = 0; t < tabs.length; t++) {
      tabs.item(t).children.item(0).classList.remove('active');
      tabs.item(t).children.item(1).classList.remove('active');
    }
  }
}
