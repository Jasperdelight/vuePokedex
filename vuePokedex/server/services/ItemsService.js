import { dbContext } from "../db/DbContext"

class ItemsService{
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