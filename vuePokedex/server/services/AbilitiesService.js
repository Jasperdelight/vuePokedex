import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors";

class AbilitiesService{
  async getMyAbilityById(abilityId) {
    const ability = await dbContext.Ability.findById(abilityId).populate(['mainPokemon'])
    return ability;
  }
  async removeAbility(abilityId, userId) {
    const removedAbility = await dbContext.Ability.findById(abilityId)
    if(!removedAbility){
      throw new BadRequest('no pokemon with that ID exists')
    }
    if (removedAbility.creatorId != userId) {
      throw new Forbidden('That ability is not yours to delete')
    }
    await removedAbility.remove()
    return removedAbility
  }
  async getMyAbilities() {
    let abilities = await dbContext.Ability.find()
    return abilities;
  }
  
  async saveAbility(body) {
    let ability = await dbContext.Ability.create(body)
    await ability.populate('mainPokemon')
    return ability;
  }

}
export const abilitiesService = new AbilitiesService()