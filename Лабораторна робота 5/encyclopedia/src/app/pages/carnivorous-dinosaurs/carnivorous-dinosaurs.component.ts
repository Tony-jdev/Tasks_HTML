import { Component } from '@angular/core';
import {Dinosaur} from '../../core/models/dinosaur.model';
import {DinosaurService} from '../../core/services/dinosaur.service';
import {RouterLink} from '@angular/router';
import {DinosaurAccordionComponent} from '../../shared/dinosaur-accordion/dinosaur-accordion.component';

@Component({
  selector: 'app-carnivorous-dinosaurs',
  imports: [
    RouterLink,
    DinosaurAccordionComponent
  ],
  templateUrl: './carnivorous-dinosaurs.component.html',
  styleUrl: './carnivorous-dinosaurs.component.css',
})
export class CarnivorousDinosaursComponent {
  accordionItems = [
    { id: 'tyrannosaurus', icon: '🦖', name: 'Тиранозавр Рекс', description: 'Найвідоміший хижак' },
    { id: 'velociraptor', icon: '🦅', name: 'Велцираптор', description: 'Швидкий смертельний хижак' },
    { id: 'allosaurus', icon: '🦕', name: 'Аллозавр', description: 'Полював групами' },
    { id: 'spinosaurus', icon: '🌊', name: 'Спінозавр', description: 'Найбільший водний хижак' },
    { id: 'carnotaurus', icon: '🦏', name: 'Карнотавр', description: 'Швидкий рогатий хижак' },
    { id: 'giganotosaurus', icon: '🏔️', name: 'Гіганотозавр', description: 'Гігантський хижак' },
    { id: 'dilophosaurus', icon: '👑', name: 'Дилофозавр', description: 'Два гребені на голові' },
    { id: 'megalosaurus', icon: '📜', name: 'Мегалозавр', description: 'Перший описаний динозавр' },
    { id: 'ceratosaurus', icon: '🦌', name: 'Цератозавр', description: 'Ріг на носі' },
    { id: 'utahraptor', icon: '⚔️', name: 'Ютахраптор', description: 'Найбільший раптор' },
  ];

  dinosaurs: Dinosaur[] = [];
  filteredDinosaurs: Dinosaur[] = [];

  constructor(private dinosaurService: DinosaurService) {}

  ngOnInit(): void {
    this.dinosaurs = this.dinosaurService.getCarnivorousDinosaurs();
    this.filteredDinosaurs = [...this.dinosaurs];
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.filteredDinosaurs = this.dinosaurService.searchDinosaurs(query);
  }

  scrollToDinosaur(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.style.boxShadow = '0 0 20px rgba(41, 3, 64, 0.8)';
      setTimeout(() => (element.style.boxShadow = ''), 2000);
    }
  }
}
