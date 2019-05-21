import mongoose from 'mongoose'
import { ObjectID } from 'mongodb'

const Schema = mongoose.Schema

ObjectID.prototype.valueOf = function() {
  return this.toString()
}

const CarSchema = new Schema({
  model: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  priceTotal: {
    type: Number,
    required: false,
  },
  priceMonthly: {
    type: Number,
    required: false,
  },
})

export default mongoose.model('Car', CarSchema)
