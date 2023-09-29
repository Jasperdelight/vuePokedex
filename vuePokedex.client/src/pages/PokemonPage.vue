<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-4">
        <div v-for="pokemon in caughtPokemon" :key="pokemon.name" @click="setActivePokemon(pokemon)" class="selectable col-12" >
          {{ pokemon.name }}
        </div>
      </div>
      <div v-if="activePokemon" class="col-6">
        <ActivePokemonCard :activePokemon = "activePokemon"/>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from "vue";
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
            getMyPokemon();
            AppState.activePokemon = null
        });
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
            }
        };
    },
    components: { ActivePokemonCard }
}
</script>


<style lang="scss" scoped>

</style>