import {Author} from './author.model';

export interface Dinosaur {
  id: string;
  nameUk: string;
  nameEn: string;
  type: string; // 'carnivorous' | 'herbivorous'
  period: string; // Період (крейдовий, юрський тощо)
  length?: number; // метри
  weight?: number; // тонни
  description: string;
  author: Author;
  imagePath: string;
  icon: string; // Emoji для акордеону
  shortDescription: string; // Для акордеону
}
