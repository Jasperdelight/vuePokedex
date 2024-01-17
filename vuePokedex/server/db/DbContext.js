import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PokemonSchema } from "../models/Pokemon";
import { AbilitySchema } from "../models/Ability";
import { ItemSchema } from "../models/Item";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Pokemon = mongoose.model('Pokemon', PokemonSchema);
  Ability = mongoose.model('Ability', AbilitySchema);
  Item = mongoose.model('Item', ItemSchema);
}

export const dbContext = new DbContext()
