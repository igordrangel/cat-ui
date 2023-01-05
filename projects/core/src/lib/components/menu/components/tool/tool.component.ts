import { AppConfigMenuTool } from './../../../../factory/app-config.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cat-menu-tool[tools]',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css'],
})
export class ToolComponent {
  @Input() tools: AppConfigMenuTool[];

  closeAllTools() {
    const tools = document.querySelectorAll('cat-menu .tool.collapsed');
    tools.forEach((tool) => tool.classList.remove('collapsed'));
  }
}
