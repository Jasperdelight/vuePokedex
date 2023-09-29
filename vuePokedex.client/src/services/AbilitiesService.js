import { AppState } from "../AppState"
import { Ability } from "../models/Ability"
import { logger } from "../utils/Logger"
import { blankApi } from "./AxiosService"

class AbilitiesService{
async getAbilityDetails(ability){
  const res = await blankApi.get(`${ability}`)
  AppState.activeAbility = new Ability(res.data)
  logger.log(AppState.activeAbility)
}
}
export const abilitiesService = new AbilitiesService()