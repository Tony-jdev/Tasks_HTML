import { Routes } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {HomeComponent} from './pages/home/home.component';
import {CarnivorousDinosaursComponent} from './pages/carnivorous-dinosaurs/carnivorous-dinosaurs.component';
import {FeedbackComponent} from './pages/feedback/feedback.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'some1', component: CarnivorousDinosaursComponent },
      { path: 'feedback', component: FeedbackComponent }
    ]
  }
];
