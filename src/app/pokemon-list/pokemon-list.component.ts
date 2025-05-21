import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';
import { Pokemon } from '../pokeTypes/pokeTypes.component';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-pokemon-list',
  imports: [NgFor, NgClass, NgStyle, RouterLink ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  providers: [PokemonService]
})


export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  isDisplay:boolean = false;
  isShiny:boolean = false;
  type: any;

  constructor(private pokemonService: PokemonService) {


  }

  ngOnInit(): void {
    this.loadPokemons();
  }

  async loadPokemons(){
    this.pokemonService
    .fetchPokemonList('https://tyradex.vercel.app/api/v1/gen/1')
    .then((response) => {
      this.pokemons = response;
      console.log(response)
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des Pokémon:', error);
    });
  }

  afficherInfo(){
    this.isDisplay= !this.isDisplay;
  }

  afficherShiny(){
    this.isShiny= !this.isShiny;
  }
  
  colorType(type:string) :any {
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
        return '#3FA129';
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
