import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { randomString } from '@koalarx/utils/operators/string';

@Component({
  selector: 'cat-tab-group',
  templateUrl: './tab-group.component.html',
})
export class TabGroupComponent implements OnInit, OnChanges {
  @Input() selectedIndex = 0;

  tabGroupId = randomString(10, {
    lowercase: true,
    uppercase: true,
    numbers: false,
    specialCharacters: false,
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['selectedIndex']) {
      this.autoSelect(true);
    }
  }

  ngOnInit(): void {
    this.autoSelect();
  }

  private autoSelect(force = false) {
    setTimeout(() => {
      const tabs = document.querySelectorAll(
        `.cat-tab-group-content#${this.tabGroupId} cat-tab`
      );

      if (tabs?.length > 0) {
        const tmpTabs: Element[] = [];
        tabs.forEach((tab) => tmpTabs.push(tab));
        if (
          !tmpTabs.find((tmpTab) =>
            tmpTab.children.item(0).classList.contains('active')
          ) ||
          force
        ) {
          tabs.forEach((tab) => {
            tab.children.item(0).classList.remove('active');
            tab.children.item(1).classList.remove('active');
          });

          tabs[this.selectedIndex].children.item(0).classList.add('active');
          tabs[this.selectedIndex].children.item(1).classList.add('active');
        }
      }
    }, 50);
  }
}
