import { AppState } from "../AppState"
import { Pokemon } from "../models/Pokemon"
import { logger } from "../utils/Logger"
import { api, blankApi, pokemonApi } from "./AxiosService"

class PokemonService {
  async getPokemon(){
    const res = await pokemonApi.get('/pokemon')
    logger.log(res.data)
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
    AppState.allPokemon = res.data.results.map(p => new Pokemon(p))
    logger.log('pokes in appstate', AppState.allPokemon)
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
  // async setActivePokemon(pokemon){
  //   const res = await pokemonApi.get(`/pokemon`)
  //   AppState.activePokemon = pokemon
  //   logger.log('poke in appstate', AppState.activePokemon)
  // }
  async nextPage(){
    const nextPG = AppState.nextPage
    const res = await blankApi.get(`${nextPG}`);
    logger.log(res.data)
    AppState.nextPage = res.data.next
    AppState.allPokemon = res.data.results
    AppState.previousPage = res.data.previous
  }
  async previousPage(){
    const previousPG = AppState.previousPage
    const res = await blankApi.get(`${previousPG}`);
    logger.log(res.data)
    AppState.nextPage = res.data.next
    AppState.allPokemon = res.data.results
    AppState.previousPage = res.data.previous
  }
}
export const pokemonService = new PokemonService