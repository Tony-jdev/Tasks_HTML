import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Dinosaur} from '../models/dinosaur.model';

@Injectable({
  providedIn: 'root'
})
export class DinosaurService {
  private allDinosaurs: Dinosaur[] = [];

  constructor() {
    this.initializeDinosaurs();
  }

  private initializeDinosaurs(): void {
    this.allDinosaurs = [
      {
        id: 'tyrannosaurus',
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
      {
        id: 'velociraptor',
        nameUk: 'Велоцираптор',
        nameEn: 'Velociraptor',
        type: 'Carnivorous',
        period: 'крейдовий',
        length: 2,
        weight: 0.015,
        description: 'Невеликий, але дуже швидкий хижак, завдовжки лише 2 метри. Мав довгий кіготь на задніх лапах, яким завдавав смертельних ударів. Імовірно, мав пір’я.',
        author: {
          id: '2',
          firstName: 'Марія',
          lastName: 'Іваненко',
          role: 'Дослідник',
          email: 'maria@example.com'
        },
        imagePath: 'assets/images/velociraptor.jpg',
        icon: '🦕',
        shortDescription: 'Швидкий мисливець з гострими кігтями'
      },
      {
        id: 'allosaurus',
        nameUk: 'Аллозавр',
        nameEn: 'Allosaurus',
        type: 'Carnivorous',
        period: 'юрський',
        length: 9,
        weight: 2,
        description: 'Жив у юрському періоді. Його щелепи були пристосовані до швидких атак, він міг полювати групами.',
        author: {
          id: '3',
          firstName: 'Олександр',
          lastName: 'Коваленко',
          role: 'Дослідник',
          email: 'olexander@example.com'
        },
        imagePath: 'assets/images/allosaurus.jpg',
        icon: '🦖',
        shortDescription: 'Юрський мисливець з потужними щелепами'
      },
      {
        id: 'spinosaurus',
        nameUk: 'Спінозавр',
        nameEn: 'Spinosaurus',
        type: 'Carnivorous',
        period: 'крейдовий',
        length: 15,
        weight: 7,
        description: 'Один із найбільших хижих динозаврів, більший за тиранозавра. Відомий своїм вітрилоподібним виростом на спині. Імовірно, мешкав у воді та полював на рибу.',
        author: {
          id: '4',
          firstName: 'Наталія',
          lastName: 'Сидоренко',
          role: 'Редактор',
          email: 'natalia@example.com'
        },
        imagePath: 'assets/images/spinosaurus.jpg',
        icon: '🦖',
        shortDescription: 'Водяний гігант із “вітрилом” на спині'
      },
      {
        id: 'carnotaurus',
        nameUk: 'Карнотавр',
        nameEn: 'Carnotaurus',
        type: 'Carnivorous',
        period: 'крейдовий',
        length: 8,
        weight: 1.5,
        description: 'Особливістю були два роги над очима та дуже короткі передні лапи. Швидкий бігун, який полював на дрібніших динозаврів.',
        author: {
          id: '1',
          firstName: 'Іван',
          lastName: 'Петренко',
          role: 'Редактор',
          email: 'ivan@example.com'
        },
        imagePath: 'assets/images/carnotaurus.jpg',
        icon: '🦖',
        shortDescription: 'Рогатий хижак з короткими лапами'
      },
      {
        id: 'giganotosaurus',
        nameUk: 'Гіганотозавр',
        nameEn: 'Giganotosaurus',
        type: 'Carnivorous',
        period: 'крейдовий',
        length: 13,
        weight: 8,
        description: 'Жив у Південній Америці. Довжина понад 13 метрів. Вважається одним із найбільших наземних хижаків.',
        author: {
          id: '2',
          firstName: 'Марія',
          lastName: 'Іваненко',
          role: 'Дослідник',
          email: 'maria@example.com'
        },
        imagePath: 'assets/images/giganotosaurus.jpg',
        icon: '🦖',
        shortDescription: 'Південноамериканський велетень'
      },
      {
        id: 'dilophosaurus',
        nameUk: 'Дилофозавр',
        nameEn: 'Dilophosaurus',
        type: 'Carnivorous',
        period: 'юрський',
        length: 6,
        weight: 0.4,
        description: 'Один із перших великих хижаків юрського періоду. Впізнаваний за двома гребенями на голові.',
        author: {
          id: '3',
          firstName: 'Олександр',
          lastName: 'Коваленко',
          role: 'Дослідник',
          email: 'olexander@example.com'
        },
        imagePath: 'assets/images/dilophosaurus.jpg',
        icon: '🦖',
        shortDescription: 'Юрський мисливець з подвійним гребенем'
      },
      {
        id: 'megalosaurus',
        nameUk: 'Мегалозавр',
        nameEn: 'Megalosaurus',
        type: 'Carnivorous',
        period: 'юрський',
        length: 9,
        weight: 1,
        description: 'Перший динозавр, офіційно описаний науковцями (1824 рік). Став символом початку палеонтології динозаврів.',
        author: {
          id: '4',
          firstName: 'Наталія',
          lastName: 'Сидоренко',
          role: 'Редактор',
          email: 'natalia@example.com'
        },
        imagePath: 'assets/images/megalosaurus.jpg',
        icon: '🦖',
        shortDescription: 'Перший відкритий динозавр'
      },
      {
        id: 'ceratosaurus',
        nameUk: 'Цератозавр',
        nameEn: 'Ceratosaurus',
        type: 'Carnivorous',
        period: 'юрський',
        length: 6,
        weight: 0.7,
        description: 'Мав ріг на носі та міцні щелепи. Його рештки знаходять у США та Португалії.',
        author: {
          id: '1',
          firstName: 'Іван',
          lastName: 'Петренко',
          role: 'Редактор',
          email: 'ivan@example.com'
        },
        imagePath: 'assets/images/ceratosaurus.jpg',
        icon: '🦖',
        shortDescription: 'Хижак із рогом на носі'
      },
      {
        id: 'utahraptor',
        nameUk: 'Ютахраптор',
        nameEn: 'Utahraptor',
        type: 'Carnivorous',
        period: 'крейдовий',
        length: 7,
        weight: 0.5,
        description: 'Найбільший представник родини рапторів. Досягав до 7 метрів у довжину і мав смертоносні кігті.',
        author: {
          id: '2',
          firstName: 'Марія',
          lastName: 'Іваненко',
          role: 'Дослідник',
          email: 'maria@example.com'
        },
        imagePath: 'assets/images/utahraptor.jpg',
        icon: '🦕',
        shortDescription: 'Гігант серед рапторів'
      }
    ];
  }

  getCarnivorousDinosaurs(): Dinosaur[] {
    return this.allDinosaurs.filter(d => d.type.toLowerCase() === 'carnivorous');
  }

  searchDinosaurs(query: string): Dinosaur[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getCarnivorousDinosaurs();
    return this.getCarnivorousDinosaurs().filter(d =>
      d.nameUk.toLowerCase().includes(q) ||
      d.nameEn.toLowerCase().includes(q)
    );
  }
}
