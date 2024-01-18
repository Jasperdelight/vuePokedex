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
    const item = itemsService.saveItem(req.body)
  return res.send(item)
  } catch(error) {
    next(error);
  }
  }
}