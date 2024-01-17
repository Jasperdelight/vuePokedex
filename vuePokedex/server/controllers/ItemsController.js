import { itemsService } from "../services/ItemsService";
import BaseController from "../utils/BaseController";

export class ItemsController extends BaseController{
  constructor(){
    super('api/items')
    this.router
    .get('', this.getMyItems)
  }
  async getMyItems (req, res, next) {
  try{
      const items = await itemsService.getMyItems()
  return res.send(items)
  } catch(error) {
      next(error);
  }
  }
}