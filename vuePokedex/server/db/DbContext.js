import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PokemonSchema } from "../models/Pokemon";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Pokemon = mongoose.model('Pokemon', PokemonSchema);
}

export const dbContext = new DbContext()
