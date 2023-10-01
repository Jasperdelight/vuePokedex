<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-2 bg-danger text-white text-shadow">
        <section class="row">
          <div class="col-12 my-4"> </div>
          <p v-for="pokemon in caughtPokemon" :key="pokemon.name" @click="setActivePokemon(pokemon)" class="selectable col-12" >
            {{ pokemon.name }}
          </p>
        </section>
      </div>
      <div v-if="activePokemon" class="col-10">
        <button  class="btn btn-danger" @click="removePokemon(activePokemon.id)"> Remove </button>
        <ActivePokemonCard :activePokemon = "activePokemon"/>
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
                    await pokemonService.getPokemonDetails(pokemon.name);
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async removePokemon(pokeId){
              try{
                const wantsToDelete = await Pop.confirm('Are you sure you want to cancel your ticket to this event?')
                if (!wantsToDelete) {
                  return
                }
                const foundPoke = AppState.caughtPokemon.find(p => p.id == pokeId)
                logger.log(foundPoke)
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