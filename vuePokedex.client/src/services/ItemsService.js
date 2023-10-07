import { AppState } from "../AppState"
import { Item } from "../models/Item"
import { logger } from "../utils/Logger"
import { pokemonApi } from "./AxiosService"

class ItemsService{
  async findItems(name){
    const res = await pokemonApi.get(`/item/${name}`)
    logger.log(res.data)
    AppState.foundItem = new Item(res.data)
  }
}
export const itemsService = new ItemsService()