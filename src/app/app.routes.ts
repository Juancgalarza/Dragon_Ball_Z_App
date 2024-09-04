import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'principal',
    loadComponent: () => import('./paginas/principal/principal.page').then( m => m.PrincipalPage)
  },
  {
    path: 'intro',
    loadComponent: () => import('./paginas/intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'character-detail/:id',
    loadComponent: () => import('./paginas/character-detail/character-detail.page').then( m => m.CharacterDetailPage)
  },
];
