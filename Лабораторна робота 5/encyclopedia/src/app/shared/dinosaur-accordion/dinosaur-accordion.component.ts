import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface AccordionItem {
  id: string;
  icon: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-dinosaur-accordion',
  imports: [],
  templateUrl: './dinosaur-accordion.component.html',
  styleUrl: './dinosaur-accordion.component.css',
})
export class DinosaurAccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Output() select = new EventEmitter<string>();

  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  choose(id: string): void {
    this.select.emit(id);
  }
}
