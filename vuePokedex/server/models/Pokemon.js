import { Schema } from "mongoose";

export const PokemonSchema = new Schema(
  {
    abilities: [Object],
    id: {type: Number, required: true},
    img: {type: String, required: true},
    height:{type:Number, required: true},
    weight: {type: Number, required: true},
    name:{type: String, required: true},
    stats:[Object],
    moves: [Object],
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } })
  PokemonSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
  })