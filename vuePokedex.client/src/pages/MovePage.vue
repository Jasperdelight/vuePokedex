<template>
    <div class="container-fluid">
    <section class="row">
      <div class="col-md-2 col-4 bg-danger text-white text-shadow">
        <section class="row">
          <div class="col-md-5 col-12"><button v-if="previousPG != null" @click="previousPage()" class="btn btn-secondary text-black"> Prev</button></div>
        <div class="col-md-2 col-12 d-flex align-items-center" title="Page Number">{{ pageCount }}</div>
        <div class="col-md-5 col-12"><button @click="nextPage()" class="btn btn-secondary text-black">Next</button></div>
          <p style="text-transform: capitalize;" v-for="move in allMoves" :key="move.name" @click="setActiveMove(move)" class="selectable col-12" >
            {{ move.name }}
          </p>
        </section>
      </div>
      <section class="col-10">
        <div class="col-12 text-center">
          <div v-if="activeMove">
            <FoundMoveCard/>
          </div>
        </div>
      </section>
      </section>
      </div>
</template>


<script>
import { computed, watchEffect } from "vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { movesService } from "../services/MovesService";
import FoundMoveCard from "../components/FoundMoveCard.vue";

export default {
    setup() {
        async function getMoves() {
            try {
                await movesService.getMoves();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        watchEffect(() => {
            getMoves();
        });
        return {
            allMoves: computed(() => AppState.allMoves),
            activeMove: computed(() => AppState.activeMove),
            pageCount: (0),
            previousPG: computed(() => AppState.previousPage),
            async setActiveMove(move) {
                try {
                    movesService.getMoveDetails(move.name);
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async nextPage() {
                try {
                    this.pageCount++;
                    await movesService.nextPage();
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async previousPage() {
                try {
                    this.pageCount--;
                    await movesService.previousPage();
                }
                catch (error) {
                    Pop.error(error.message);
                }
            }
        };
    },
    components: { FoundMoveCard }
}
</script>


<style lang="scss" scoped>

</style>