import { AppState } from "../AppState"
import { Move } from "../models/Move"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { blankApi, pokemonApi } from "./AxiosService"

class MovesService{
  async getMoveDetails(name){
    const res = await pokemonApi.get(`/move/${name}`)
    // logger.log(res.data)
    if (res.data.name == undefined) {
      Pop.error('Enter Valid Search Term')
      return
    }
    
    AppState.foundMove = new Move(res.data)
    logger.log(AppState.foundMove)
    AppState.activePokemon = null
  }
  async setActiveMove(move){
    const res = await blankApi.get(`${move}`)
    AppState.activeMove = new Move(res.data)
    logger.log(AppState.activeMove)
  }
  async getMoves(){
    const res = await pokemonApi.get(`/move`)
    logger.log(res.data)
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
    AppState.allMoves = res.data.results.map( m => new Move(m))
  }
  async nextPage(){
    const nextPG = AppState.nextPage
    const res = await blankApi.get(`${nextPG}`)
    logger.log(res.data)
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
    AppState.allMoves = res.data.results
  }
  async previousPage(){
    const previousPG = AppState.previousPage
    const res = await blankApi.get(`${previousPG}`)
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
    AppState.allMoves = res.data.results
  }
}

export const movesService = new MovesService()