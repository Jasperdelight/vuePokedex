import { AppState } from "../AppState"
import { Move } from "../models/Move"
import { logger } from "../utils/Logger"
import { pokemonApi } from "./AxiosService"

class MovesService{
  async getMoveDetails(name){
    const res = await pokemonApi.get(`/move/${name}`)
    // logger.log(res.data)
    AppState.foundMove = new Move(res.data)
    logger.log(AppState.foundMove)

  }
}
export const movesService = new MovesService()