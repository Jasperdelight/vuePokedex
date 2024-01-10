import { Auth0Provider } from "@bcwdev/auth0provider"
import { abilitiesService } from "../services/AbilitiesService"
import BaseController from "../utils/BaseController"

export class AbilitiesController extends BaseController {
  constructor(){
    super('api/abilities')
    this.router
    .get('', this.getMyAbilities)
    .get('/:abilityId', this.getMyAbilityById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.saveAbility)
    .delete('/:abilityId', this.removeAbility)
  }
  async saveAbility (req, res, next) {
  try{
      req.body.creatorId = req.userInfo.id
      const ability = await abilitiesService.saveAbility(req.body)
  return res.send(ability)
  } catch(error) {
      next(error);
  }
  }
  async getMyAbilities (req, res, next) {
  try{
      const abilities = await abilitiesService.getMyAbilities()
  return res.send(abilities)
  } catch(error) {
      next(error);
  }
  }
  async getMyAbilityById (req, res, next) {
  try{
      const abilityId = req.params.abilityId
      const ability = await abilitiesService.getMyAbilityById(abilityId)
  return res.send(ability)
  } catch(error) {
      next(error);
  }
  }
  async removeAbility (req, res, next) {
  try{
      const abilityId = req.params.abilityId
      const userId = req.userInfo._id
      let removedAbility = await abilitiesService.removeAbility(abilityId, userId)
  return res.send(removedAbility)
  } catch(error) {
      next(error);
  }
  }
}