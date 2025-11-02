import { Component } from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {Dinosaur} from '../../core/models/dinosaur.model';
import {DinosaurService} from '../../core/services/dinosaur.service';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-carnivorous-dinosaurs',
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './carnivorous-dinosaurs.component.html',
  styleUrl: './carnivorous-dinosaurs.component.css',
})
export class CarnivorousDinosaursComponent {
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
