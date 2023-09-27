import { AppState } from "../AppState"
import { Pokemon } from "../models/Pokemon"
import { logger } from "../utils/Logger"
import { api, pokemonApi } from "./AxiosService"

class PokemonService {
  async getPokemon(){
    const res = await pokemonApi.get('/pokemon')
    logger.log(res.data.results)
    AppState.allPokemon = res.data.results
  }
  async getPokemonDetails(name){
    const res = await pokemonApi.get(`/pokemon/${name}`)
    // logger.log(res.data)
    AppState.activePokemon = new Pokemon(res.data)
    logger.log('pokemon in appstate', AppState.activePokemon)
  }
  async catchPokemon(poke){
    const res = await api.post('api/pokemon', poke)
    AppState.caughtPokemon.push(new Pokemon(res.data))
    // const foundPoke = AppState.caughtPokemon.find(p=> p.id == poke.id)
    // if (foundPoke.id == poke.id) {
    //   throw new Error('Pokemon already Caught')
    // }
    logger.log(res.data)
  }
  async getMyPokemon(){
    const res = await api.get('api/pokemon')
    logger.log(res.data)
    AppState.caughtPokemon = res.data.map(p => new Pokemon(p))
  }
  setActivePokemon(pokemon){
    AppState.activePokemon = pokemon
    logger.log('poke in appstate', AppState.activePokemon)
  }
}
export const pokemonService = new PokemonService