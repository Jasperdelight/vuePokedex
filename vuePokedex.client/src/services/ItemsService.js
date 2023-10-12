import { AppState } from "../AppState"
import { Item } from "../models/Item"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { pokemonApi } from "./AxiosService"

class ItemsService{
  async findItems(name){
    const res = await pokemonApi.get(`/item/${name}`)
    if (res.data.name == undefined) {
      Pop.error('Enter Valid Search Term')
      return
    }
    logger.log(res.data)
    AppState.foundItem = new Item(res.data)
    AppState.foundMove = null
    AppState.foundAbility = null
    AppState.activePokemon = null
  }
}
export const itemsService = new ItemsService()