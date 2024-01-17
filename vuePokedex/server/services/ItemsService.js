import { dbContext } from "../db/DbContext"

class ItemsService{
  async getMyItems() {
    let items = await dbContext.Item.find()
    return items
  }

}
export const itemsService = new ItemsService()