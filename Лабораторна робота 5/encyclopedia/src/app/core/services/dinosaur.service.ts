import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Dinosaur} from '../models/dinosaur.model';

@Injectable({
  providedIn: 'root'
})
export class DinosaurService {
  private dinosaurs$ = new BehaviorSubject<Dinosaur[]>([]);
  private allDinosaurs: Dinosaur[] = [];

  constructor() {
    this.initializeDinosaurs();
  }

  private initializeDinosaurs(): void {
    this.allDinosaurs = [
      {
        id: 'tyrannosaurus',
        name: 'Тиранозавр Рекс',
        nameUk: 'Тиранозавр Рекс',
        nameEn: 'Tyrannosaurus Rex',
        type: 'Carnivorous',
        period: 'крейдовий',
        length: 12,
        weight: 8,
        description: 'Один із найбільших хижаків пізнього крейдового періоду. Довжина сягала понад 12 метрів, вага — близько 8 тонн. Відомий своїми гігантськими щелепами та зубами, здатними розламати кістки.',
        author: {
          id: '1',
          firstName: 'Іван',
          lastName: 'Петренко',
          role: 'Редактор',
          email: 'ivan@example.com'
        },
        imagePath: 'assets/images/trex.jpg',
        icon: '🦖',
        shortDescription: 'Найвідоміший хижак крейдового періоду'
      },
      // ... інші динозаври
    ];
    this.dinosaurs$.next(this.allDinosaurs);
  }

  getAllDinosaurs(): Observable<Dinosaur[]> {
    return this.dinosaurs$.asObservable();
  }

  getDinosaurById(id: string): Observable<Dinosaur | null> {
    return this.dinosaurs$.pipe(
      map(dinosaurs => dinosaurs.find(d => d.id === id) || null)
    );
  }

  getDinosaursByType(type: string): Observable<Dinosaur[]> {
    return this.dinosaurs$.pipe(
      map(dinosaurs => dinosaurs.filter(d => d.type === type))
    );
  }

  /**
   * Отримати хижих динозаврів
   */
  getCarnivorousDinosaurs(): Observable<Dinosaur[]> {
    return this.getDinosaursByType("CARNIVOROUS");
  }

  /**
   * Пошук динозаврів за назвою (українською або англійською)
   */
  searchDinosaurs(query: string): Observable<Dinosaur[]> {
    if (!query.trim()) {
      return this.getAllDinosaurs();
    }

    const lowerQuery = query.toLowerCase().trim();
    return this.dinosaurs$.pipe(
      map(dinosaurs => dinosaurs.filter(d =>
        d.nameUk.toLowerCase().includes(lowerQuery) ||
        d.nameEn.toLowerCase().includes(lowerQuery) ||
        d.name.toLowerCase().includes(lowerQuery)
      ))
    );
  }
}
