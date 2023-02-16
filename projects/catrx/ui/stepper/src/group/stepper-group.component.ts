import { Component, Input, OnInit } from '@angular/core';
import { klDelay } from '@koalarx/utils/operators/delay';
import { randomString } from '@koalarx/utils/operators/string';

@Component({
  selector: 'cat-stepper',
  templateUrl: './stepper-group.component.html',
  styleUrls: ['./stepper-group.component.css'],
})
export class StepperGroupComponent implements OnInit {
  @Input() direction: 'vertical' | 'horizontal' = 'horizontal';

  stepperGroupId = randomString(10, {
    lowercase: true,
    uppercase: true,
    numbers: false,
    specialCharacters: false,
  });

  ngOnInit(): void {
    setTimeout(() => {
      const tabs = this.getSteps();

      if (tabs.length > 0) {
        if (
          !tabs.find((tab) => tab.children.item(0).classList.contains('active'))
        ) {
          tabs[0].children.item(0).classList.add('active');
          tabs[0].children.item(1).classList.add('active');
        }
      }
    }, 50);

    if (document.body.clientWidth <= 980) {
      this.direction = 'vertical';
    }
  }

  async next() {
    const activeStep = this.getActiveStep();
    const tabs = this.getSteps();

    await this.close(tabs[activeStep]);
    await this.open(tabs[activeStep + 1]);
  }

  async previous() {
    const activeStep = this.getActiveStep();
    const tabs = this.getSteps();

    await this.close(tabs[activeStep]);
    await this.open(tabs[activeStep - 1]);
  }

  private async open(element: Element) {
    element.children.item(0).classList.add('active');
    element.children.item(1).classList.add('active');

    await this.animateOpen(element);
  }

  private async animateOpen(element: Element) {
    element.children
      .item(1)
      .children.item(0)
      .classList.add('animate__animated');
    element.children
      .item(1)
      .children.item(1)
      .classList.add('animate__animated');
    element.children
      .item(1)
      .children.item(0)
      .classList.add('animate__slideInDown');
    element.children
      .item(1)
      .children.item(1)
      .classList.add('animate__slideInDown');
    await klDelay(200);
    element.children
      .item(1)
      .children.item(0)
      .classList.remove('animate__animated');
    element.children
      .item(1)
      .children.item(1)
      .classList.remove('animate__animated');
    element.children
      .item(1)
      .children.item(0)
      .classList.remove('animate__slideInDown');
    element.children
      .item(1)
      .children.item(1)
      .classList.remove('animate__slideInDown');
  }

  private async close(element: Element) {
    await this.animateClose(element);

    element.children.item(0).classList.remove('active');
    element.children.item(1).classList.remove('active');
  }

  private async animateClose(element: Element) {
    element.children
      .item(1)
      .children.item(0)
      .classList.add('animate__animated');
    element.children
      .item(1)
      .children.item(1)
      .classList.add('animate__animated');
    element.children
      .item(1)
      .children.item(0)
      .classList.add('animate__slideOutUp');
    element.children
      .item(1)
      .children.item(1)
      .classList.add('animate__slideOutUp');
    await klDelay(200);
    element.children
      .item(1)
      .children.item(0)
      .classList.remove('animate__animated');
    element.children
      .item(1)
      .children.item(1)
      .classList.remove('animate__animated');
    element.children
      .item(1)
      .children.item(0)
      .classList.remove('animate__slideOutUp');
    element.children
      .item(1)
      .children.item(1)
      .classList.remove('animate__slideOutUp');
  }

  private getSteps() {
    const tabs = document.querySelectorAll(
      `.cat-stepper-group-content#${this.stepperGroupId} cat-step`
    );

    if (tabs?.length > 0) {
      const tmpTabs: Element[] = [];
      tabs.forEach((tab) => tmpTabs.push(tab));

      return tmpTabs;
    }

    return [];
  }

  private getActiveStep() {
    const tabs = this.getSteps();

    let stepActiveIndex = -1;

    tabs.forEach((tab, index) => {
      if (tab.children.item(0).classList.contains('active')) {
        stepActiveIndex = index;
        return;
      }
    });

    return stepActiveIndex;
  }
}
