import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { NgIf, NgFor, NgStyle } from '@angular/common';
import { Pokemon } from '../pokeTypes/pokeTypes.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-pokemon-list',
  imports: [NgFor, NgIf, NgStyle, RouterLink, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  providers: [PokemonService]
})


export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  isDisplay: boolean = false;
  isShiny: boolean = false;
  filteredPokemons: Pokemon[] = [];
  type: any;
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService) { }

ngOnInit(): void {
  this.pokemonService.fetchAll().subscribe(data => {
    const filtered = data.filter(p => p.pokedex_id !== 0);
    this.pokemons = filtered;
    this.filteredPokemons = filtered;
  });
}

  search(): void {
  const term = this.searchTerm.trim().toLowerCase();
  if (term === '') {
    this.filteredPokemons = [];
    return;
  }

  this.filteredPokemons = this.pokemons
    .filter(pokemon =>
      pokemon.pokedex_id !== 0 && 
      pokemon.name.fr.toLowerCase().includes(term)
    );
  }

  afficherInfo() {
    this.isDisplay = !this.isDisplay;
  }

  afficherShiny() {
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
