import { Schema } from "mongoose";

export const PokemonSchema = new Schema(
  {
    abilities: [{Array: String}],
    id: {type: Number, unique: true},
    img: {type: String, required: true},
    height:{type:Number, required: true},
    weight: {type: Number, required: true},
    name:{type: String, required: true},
    stats:[{Array: String,}],
    moves: [{Array: String}]
  }
)