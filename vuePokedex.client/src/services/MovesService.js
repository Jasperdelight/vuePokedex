import { AppState } from "../AppState"
import { Move } from "../models/Move"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { blankApi, pokemonApi } from "./AxiosService"

class MovesService{
  async getMoveDetails(name){
    const res = await pokemonApi.get(`/move/${name}`)
    // logger.log(res.data)
    if (res.data.name != undefined) {
      
      AppState.foundMove = new Move(res.data)
      logger.log(AppState.foundMove)
      AppState.activePokemon = null
    }
    Pop.error('Enter Valid Search Term')
  }
  async setActiveMove(move){
    const res = await blankApi.get(`${move}`)
    AppState.activeMove = new Move(res.data)
    logger.log(AppState.activeMove)
  }
}
export const movesService = new MovesService()