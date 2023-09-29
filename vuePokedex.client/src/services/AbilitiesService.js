import { logger } from "../utils/Logger"
import { blankApi } from "./AxiosService"

class AbilitiesService{
async getAbilityDetails(ability){
  const res = await blankApi.get(`${ability}`)
  logger.log(res.data)
}
}
export const abilitiesService = new AbilitiesService()