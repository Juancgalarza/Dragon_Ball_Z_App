import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInfiniteScrollContent, IonInfiniteScroll, IonImg, IonThumbnail, IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonCard, IonGrid, IonLabel, IonItem, IonChip, IonBadge, IonCardContent, IonCardHeader } from '@ionic/angular/standalone';
import { GeneralService } from 'src/app/services/general.service';
import { CharactersInterface, Item } from 'src/app/interfaces/characters.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonImg, IonCardHeader, IonThumbnail, IonCardContent, IonBadge, IonChip, IonItem, IonLabel, IonGrid, IonCard, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class PrincipalPage implements OnInit {

  characters = signal< Item[] >([]); // Señal para manejar los personajes
  params = signal({ page: 1, name: '' }); // Señal para manejar los parámetros de consulta
  isLoading = signal(false); // Señal para manejar el estado de carga

  private _dbzServ = inject( GeneralService ); 

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(event?: any) {
    this.isLoading.set(true);
    
    this._dbzServ.getCharacters(this.params()).subscribe({
      next: (res: CharactersInterface) => {
        if (res.items.length > 0) {
          // Agregar los personajes a la señal existente
          this.characters.update(current => [...current, ...res.items]);
          if (event) {
            event.target.complete();
          }
        } else {
          if (event) {
            event.target.disabled = true;
          }
        }
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Error al obtener personajes', error);
        this.isLoading.set(false);
        if (event) {
          event.target.complete();
        }
      },
    });
  }

  loadMore(event: any) {
    // Incrementar la página en los parámetros
    this.params.update(current => ({ ...current, page: current.page + 1 }));
    
    setTimeout(() => {
      this.getCharacters(event);
    }, 1500); 
  }


}
