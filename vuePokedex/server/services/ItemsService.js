import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class ItemsService{
  async removeItem(itemId, userId) {
    const removedItem = await dbContext.Item.findById(itemId)
    if (!removedItem) {
      throw new BadRequest('no item with that ID exists')
    }
    if(removedItem.creatorId != userId){
      throw new Forbidden('that Item is not yours to delete')
    }
    await removedItem.remove()
    return removedItem
  }
  async saveItem(body) {
    const item = await dbContext.Item.create(body)
    await item.populate('mainPokemon', 'creatorId')
    return item;
  }
  async getMyItems() {
    const items = await dbContext.Item.find()
    return items
  }

}
export const itemsService = new ItemsService()