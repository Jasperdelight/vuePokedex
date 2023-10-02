<template>
<div class="container-fluid">
  <section class="row">
    <div class="col-2 bg-danger text-white text-shadow">
      <section class="row">
        <div class="col-6"><button v-if="previousPG != null" @click="previousPage()" class="btn btn-secondary text-black"> Prev</button></div>
        <div class="col-6"><button @click="nextPage()" class="btn btn-secondary text-black">Next</button></div>
        <p style="text-transform: capitalize;" v-for="p in allPokemon" :key="p.name" @click="getPokemonDetails(p.name)" class="selectable col-12">{{ p.name }}</p>
      </section>
    </div>
    <div class="col-10">
      <button v-if="account.id && activePokemon" @click="catchPokemon(activePokemon)" class="btn btn-outline-danger"><i class="mdi mdi-pokeball"></i></button>
      <div v-if="activePokemon">
        <ActivePokemonCard :activePokemon = "activePokemon"/>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import {pokemonService} from "../services/PokemonService"
import { AppState } from "../AppState";
import ActivePokemonCard from "../components/ActivePokemonCard.vue";
export default {
    setup() {
        async function getPokemon() {
            try {
                await pokemonService.getPokemon();
            }
            catch (error) {
                Pop.error(error.message);
                logger.log(error);
            }
        }
        onMounted(() => {
            getPokemon();
            AppState.activePokemon = null
            // getMyPokemon()
        });
        return {
            allPokemon: computed(() => AppState.allPokemon),
            activePokemon: computed(() => AppState.activePokemon),
            caughtPokemon: computed(() => AppState.caughtPokemon),
            account: computed(() => AppState.account),
            previousPG: computed(()=> AppState.previousPage),
            async getPokemonDetails(name) {
                try {
                    await pokemonService.getPokemonDetails(name);
                }
                catch (error) {
                    Pop.error(error.message);
                    logger.log(error);
                }
            },
            async catchPokemon(poke) {
                try {
                    if (this.caughtPokemon.find(p => p.name == poke.name)) {
                        logger.log('already caught');
                        Pop.toast('pokemon already caught!');
                    }
                    else {
                        await pokemonService.catchPokemon(poke);
                    }
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async nextPage(){
              try{
                  await pokemonService.nextPage();
              } catch(error) {
                  Pop.error(error.message);
              }
            },
            async previousPage(){
              try{
                  await pokemonService.previousPage();
              } catch(error) {
                  Pop.error(error.message);
              }
            }
        };
    },
    components: { ActivePokemonCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
