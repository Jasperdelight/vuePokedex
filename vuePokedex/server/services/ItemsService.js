import { dbContext } from "../db/DbContext"

class ItemsService{
  async saveItem(body) {
    let item = await dbContext.Item.create(body)
    await item.populate('mainPokemon', 'creatorId')
    return item;
  }
  async getMyItems() {
    let items = await dbContext.Item.find()
    return items
  }

}
export const itemsService = new ItemsService()