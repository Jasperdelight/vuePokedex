<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-2 col-4 bg-danger text-white text-shadow">
        <section class="row">
          <div class="col-12 my-4"> </div>
          <p style="text-transform: capitalize;" v-for="pokemon in caughtPokemon" :key="pokemon.name" @click="setActivePokemon(pokemon)" class="selectable col-12" >
            {{ pokemon.name }}
          </p>
        </section>
      </div>
      
      <div v-if="activePokemon == null && foundMove == null" class="col-10 d-flex justify-content-center flex-column">
      <p class="fs-2 text-center">View Caught Pokemon!</p>
      <img src="https://www.gamespot.com/a/uploads/scale_medium/1601/16018044/3968710-pokedex-run.jpg" alt="pokedex" class="img-fluid ">
    </div>

      <div v-if="activePokemon" class="col-md-10 col-8">
        <div class="col-12 d-flex justify-content-center">
          <button  class="btn btn-danger" @click="removePokemon(activePokemon.id)"> Remove </button>
        </div>
        <div>
          <ActivePokemonCard :activePokemon = "activePokemon"/>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "vue";
import { pokemonService } from "../services/PokemonService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import ActivePokemonCard from "../components/ActivePokemonCard.vue";

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
        onMounted(() => {
            // getPokemon()
            // getMyPokemon();
            AppState.activePokemon = null
        });
        watchEffect(()=> {
            getMyPokemon();
        })
        return {
            caughtPokemon: computed(() => AppState.caughtPokemon),
            activePokemon: computed(() => AppState.activePokemon),
            foundMove: computed(() => AppState.foundMove),
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
            }
        };
    },
    components: { ActivePokemonCard }
}
</script>


<style lang="scss" scoped>

</style>