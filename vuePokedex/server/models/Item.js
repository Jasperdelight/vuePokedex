import { Schema } from "mongoose";

export const ItemSchema = new Schema(
  {
    id: {type: Number, required: true},
    name: {type: String, required: true},
    effectChanges: [Array],
    effectEntries: [Array],
    flavorTextEntries: [Array],
    generation: [Object],
    pokemon: [Object],
    category: [Object],
    attributes: [Array],
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    pokemonId: { type: Number, ref: 'Pokemon', required: true}
  }, { timestamps: true, toJSON: { virtuals: true } })
  ItemSchema.virtual('mainPokemon', {
    localField: 'pokemonId',
    foreignField: 'id',
    justOne: true,
    ref: 'Pokemon'
  }
)