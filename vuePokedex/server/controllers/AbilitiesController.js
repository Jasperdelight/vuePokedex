import { abilitiesService } from "../services/AbilitiesService"
import BaseController from "../utils/BaseController"

export class AbilitiesController extends BaseController {
  constructor(){
    super('api/abilities')
    this.router
    .post('', this.saveAbility)
  }
  async saveAbility (req, res, next) {
  try{
      const ability = await abilitiesService.saveAbility(req.body)
  return res.send(ability)
  } catch(error) {
      next(error);
  }
  }
}