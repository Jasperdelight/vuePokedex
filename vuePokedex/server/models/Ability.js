import { Schema } from "mongoose";

export const AbilitySchema = new Schema(
  {
    id: {type: Number, required: true},
    name: {type: String, required: true},
    effectChanges: [{Array: String}],
    effectEntries: [{Array: String}],
    flavorTextEntries: [{Array: String}],
    generation: [{Array: String}],
    pokemon: [{Array: String}],
    pokemonId: { type: Number, ref: 'Pokemon', required: true}
  }, { timestamps: true, toJSON: { virtuals: true } })
  AbilitySchema.virtual('mainPokemon', {
    localField: 'pokemonId',
    foreignField: 'id',
    justOne: true,
    ref: 'Pokemon'
  })