<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-2 col-4 bg-danger text-white text-shadow">
        <section class="row">
          <div class="col-12 my-4"> </div>
          <!-- Pokemon -->
          <p style="text-transform: capitalize;" v-for="pokemon in caughtPokemon" :key="pokemon.name" @click="setActivePokemon(pokemon)" class="selectable col-12" >
            {{ pokemon.name }}
          </p>
          <!-- Abilities -->
          <p class="text-dark">Abilities</p>
          <!-- TODO Remove ability for multiples of same ability on backend && Change function on click of found ability to call own backend instead of poke api -->
          <p style="text-transform: capitalize;" v-for="ability in myAbilities" :key="ability.name" class="selectable col-12" @click="getMyAbilityDetails(ability)" >
            {{ ability.name }}
          </p>
        </section>
      </div>
      
      <div v-if="activePokemon == null && foundMove == null && foundAbility == null" class="col-10 d-flex justify-content-center flex-column">
      <p class="fs-2 text-center">View Caught Pokemon!</p>
      <img src="https://www.gamespot.com/a/uploads/scale_medium/1601/16018044/3968710-pokedex-run.jpg" alt="pokedex" class="img-fluid ">
    </div>

      <div v-if="activePokemon" class="col-md-10 col-8">
        <div class="col-12 d-flex justify-content-center">
          <button  class="btn btn-danger" @click="removePokemon(activePokemon.id)"> Remove </button>
        </div>
        <div v-if="activePokemon">
          <ActivePokemonCard :activePokemon = "activePokemon"/>
        </div>
      </div>
      <div v-if="foundAbility" class="col-md-10 col-8">
        <div class="col-12 d-flex justify-content-center">
          <button  class="btn btn-danger" @click="removeAbility(foundAbility)"> Remove </button>
        </div>
        <FoundAbilityCard/>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "vue";
import { pokemonService } from "../services/PokemonService";
import { abilitiesService } from "../services/AbilitiesService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import ActivePokemonCard from "../components/ActivePokemonCard.vue";
import FoundAbilityCard from "../components/FoundAbilityCard.vue";

export default {
    setup() {
        async function getMyPokemon() {
            try {
                await pokemonService.getMyPokemon();
                // debugger;
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        async function getMyAbilities(){
          try{
              await abilitiesService.getMyAbilities()
          } catch(error) {
              Pop.error(error.message);
          }
        }
        onMounted(() => {
            // getPokemon()
            // getMyPokemon();
            AppState.activePokemon = null
        });
        watchEffect(()=> {
            getMyPokemon();
            getMyAbilities();
        })
        return {
            caughtPokemon: computed(() => AppState.caughtPokemon),
            activePokemon: computed(() => AppState.activePokemon),
            foundMove: computed(() => AppState.foundMove),
            myAbilities: computed(() => AppState.myAbilities),
            foundAbility: computed(() => AppState.foundAbility),
            async getPokemonDetails(name) {
                try {
                    await pokemonService.getPokemonDetails(name);
                }
                catch (error) {
                    Pop.error(error.message);
                    logger.log(error);
                }
            },
            async setActivePokemon(pokemon) {
                try {
                  // logger.log(pokemon._id)
                    await pokemonService.getMyPokemonDetails(pokemon._id);
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async getMyAbilityDetails(ability){
              try{
                logger.log(ability)
                  abilitiesService.getMyAbilityDetails(ability._id)
              } catch(error) {
                  Pop.error(error.message);
              }
            },
            async removePokemon(pokeId){
              try{
                const foundPoke = AppState.caughtPokemon.find(p => p.id == pokeId)
                // logger.log(foundPoke)
                const wantsToDelete = await Pop.confirm(`Are you sure you want to let ${foundPoke.name} free?`)
                if (!wantsToDelete) {
                  return
                }
                await pokemonService.removePokemon(foundPoke)
              } catch(error) {
                  Pop.error(error.message);
              }
            },
            async removeAbility(foundAbility){
              try{ 
                const wantsToDelete = await Pop.confirm(`Are you sure you want to remove ${foundAbility.name}`)
                  if (!wantsToDelete) {
                    return
                  }
                  await abilitiesService.removeAbility(foundAbility.id)
              } catch(error) {
                  Pop.error(error.message);
              }
            }
        };
    },
    components: { ActivePokemonCard, FoundAbilityCard }
}
</script>


<style lang="scss" scoped>

</style>