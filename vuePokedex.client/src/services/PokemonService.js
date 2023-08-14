import { AppState } from "../AppState"
import { Pokemon } from "../models/Pokemon"
import { logger } from "../utils/Logger"
import { pokemonApi } from "./AxiosService"

class PokemonService {
  async getPokemon(){
    const res = await pokemonApi.get('/pokemon')
    logger.log(res.data.results)
    AppState.allPokemon = res.data.results
  }
  async getPokemonDetails(name){
    const res = await pokemonApi.get(`/pokemon/${name}`)
    logger.log(res.data)
    AppState.activePokemon = new Pokemon(res.data)
    logger.log('pokemon in appstate', AppState.activePokemon)
  }

}
export const pokemonService = new PokemonService