import { Routes } from '@angular/router';
import { DinosaurList } from './features/dinosaurs/dinosaur-list/dinosaur-list';

export const routes: Routes = [
  { path: '', redirectTo: '/dinosaurs', pathMatch: 'full' },
  { path: 'dinosaurs', component: DinosaurList }
];
