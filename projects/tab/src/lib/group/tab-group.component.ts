import { Component, OnInit } from '@angular/core';
import { randomString } from '@koalarx/utils/operators/string';
import { Subject } from 'rxjs';

@Component({
  selector: 'cat-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.css']
})
export class TabGroupComponent implements OnInit {
  tabGroupId = randomString(10, { lowercase: true, uppercase: true, numbers: false, specialCharacters: false });

  ngOnInit(): void {
    setTimeout(() => {
      const tabs = document.querySelectorAll(
        `.cat-tab-group-content#${this.tabGroupId} cat-tab`
      );

      if (tabs?.length > 0) {
        const tmpTabs: Element[] = [];
        tabs.forEach((tab) => tmpTabs.push(tab));
        if (
          !tmpTabs.find((tmpTab) => tmpTab.children.item(0).classList.contains('active'))
        ) {
          tabs[0].children.item(0).classList.add('active');
          tabs[0].children.item(1).classList.add('active');
        }
      }
    }, 300);
  }
}
