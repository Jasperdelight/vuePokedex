import { dbContext } from "../db/DbContext"

class AbilitiesService{
  async saveAbility(body) {
    let ability = await dbContext.Ability.create(body)
    await ability.populate('mainPokemon')
    return ability;
  }

}
export const abilitiesService = new AbilitiesService()