import { Auth0Provider } from "@bcwdev/auth0provider";
import { itemsService } from "../services/ItemsService";
import BaseController from "../utils/BaseController";

export class ItemsController extends BaseController{
  constructor(){
    super('api/items')
    this.router
    .get('', this.getMyItems)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.saveItem)
    .delete('/:itemId', this.removeItem)
  }
  async getMyItems (req, res, next) {
  try{
    const items = await itemsService.getMyItems()
  return res.send(items)
  } catch(error) {
    next(error);
  }
  }
  async saveItem (req, res, next) {
  try{
    req.body.creatorId = req.userInfo.id
    const item = itemsService.saveItem(req.body)
  return res.send(item)
  } catch(error) {
    next(error);
  }
  }
  async removeItem (req, res, next) {
  try{
      const itemId = req.params.itemId
      const userId = req.userInfo.id
      let removedItem = await itemsService.removeItem(itemId, userId)
  return res.send(removedItem)
  } catch(error) {
      next(error);
  }
  }
}