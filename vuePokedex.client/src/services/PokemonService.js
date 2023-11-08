import { AppState } from "../AppState"
import { Move } from "../models/Move"
import { Pokemon } from "../models/Pokemon"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
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
  // Poke API currently giving back bad img URL change to remove extra URL if not fixed
  async getPokemonDetails(name){
    const res = await pokemonApi.get(`/pokemon/${name}`)
    if (res.data.name == undefined) {
      Pop.error('Enter Valid Search Term')
      return
    }
    AppState.activePokemon = new Pokemon(res.data)
    logger.log('pokemon in appstate', AppState.activePokemon)
    AppState.foundMove = null
  }

  async catchPokemon(poke){
    const res = await api.post('api/pokemon', poke)
    AppState.caughtPokemon.push(new Pokemon(res.data))
    Pop.toast(`${res.data.name} has been caught!`)
    logger.log(res.data)
  }
  async removePokemon(poke){
    const pokeId = poke._id
    // logger.log(pokeId)
    const res = await api.delete(`api/pokemon/${pokeId}`)
    Pop.toast(`${poke.name} has been set free!`)
    const pokemonToRemove = AppState.caughtPokemon.findIndex(p => p._id == pokeId)
    AppState.caughtPokemon.splice(pokemonToRemove, 1)
    AppState.activePokemon = null
    logger.log(AppState.caughtPokemon)
  }
  async getMyPokemon(){
    const res = await api.get('api/pokemon')
    logger.log(res.data)
    AppState.caughtPokemon = res.data.map(p => new Pokemon(p))
  }
  async getMyPokemonDetails(pokemonId){
    const res = await api.get(`api/pokemon/${pokemonId}`)
    logger.log(res.data)
    AppState.activePokemon = new Pokemon(res.data)
    AppState.foundMove = null
    AppState.foundItem = null
    AppState.foundAbility = null
  }
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