import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../pokeTypes/pokeTypes.component';
import { CommonModule, KeyValuePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  imports: [NgFor, NgIf, NgStyle, NgClass, KeyValuePipe, CommonModule, RouterLink
  ],
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  // pokemon: Pokemon | undefined;
  pokemon?: Pokemon;
  isShiny: boolean = false;
  stats: { name: string; value: number }[] = [];
  maxStat: number = 255;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        this.pokemonService.getById(id).subscribe({
          next: (pokemonData) => {
            this.pokemon = pokemonData;
            this.isShiny = false;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération du Pokémon :', err);
            this.pokemon = undefined;
          },
        });
      } else {
        console.warn('ID manquant dans l’URL');
        this.pokemon = undefined;
      }
    });
  }


  toggleShiny() {
    this.isShiny = !this.isShiny;
  }

  colorType(type: string): any {
    switch (type) {
      case 'Poison':
        return '#8F41CB';
        break;
      case 'Plante':
        return '#3FA129';
        break;
      case 'Acier':
        return '#60A1B8';
        break;
      case 'Feu':
        return '#E62829';
        break;
      case 'Combat':
        return '#FF8000';
        break;
      case 'Dragon':
        return '#5061E1';
        break;
      case 'Eau':
        return '#2980EF';
        break;
      case 'Fée':
        return '#EF71EF';
        break;
      case 'Glace':
        return '#3FD8FF';
        break;
      case 'Insecte':
        return '#91A119';
        break;
      case 'Normal':
        return '#9FA19F';
        break;
      case 'Psy':
        return '#EF4179';
        break;
      case 'Roche':
        return '#AFA981';
        break;
      case 'Sol':
        return '#915121';
        break;
      case 'Spectre':
        return '#704170';
        break;
      case 'Ténèbres':
        return '#4f403e';
        break;
      case 'Vol':
        return '#81B9EF';
        break;
      case 'Électrik':
        return '#FAC000';
        break;
    }
  }


}
