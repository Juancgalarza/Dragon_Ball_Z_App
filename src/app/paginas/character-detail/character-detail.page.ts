import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonChip, IonCol, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonBadge, IonImg, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { CharacterInterface } from 'src/app/interfaces/character.interface';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonImg, IonBadge, IonCardHeader, IonCardTitle, IonCard, IonCardContent, IonCol, IonRow, IonChip, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CharacterDetailPage implements OnInit {

  characterId = signal<string>('');  // Señal para almacenar el ID del personaje
  character = signal<CharacterInterface | null>(null);  // Señal para almacenar el personaje
  isLoading = signal<boolean>(false);  // Señal para manejar el estado de carga

  private actiRoute = inject( ActivatedRoute );
  private _dbzServ = inject( GeneralService ); 

  ngOnInit() {
    this.characterId.set(this.actiRoute.snapshot.paramMap.get('id') as string);
    this.getCharacter();
  }

  getCharacter() {
    this.isLoading.set(true);  
    this._dbzServ.getCharactersById(this.characterId()).subscribe({
      next: (res: CharacterInterface) => {  
        setTimeout(() => {
          this.character.set(res);
          this.isLoading.set(false);
        }, 1000);  
      },
      error: (error: any) => {
        console.error('Error al obtener el personaje', error);
        this.isLoading.set(false);  
      },
    });
  }

}
