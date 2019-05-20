import { GraphQLServer, PubSub } from 'graphql-yoga'
import mongoose from 'mongoose'

import schema from '../graphql/'
import { models } from './config/db/'
require('dotenv').config()

const { MONGODB_USER, MONGODB_PASS, MONGODB_HOST } = process.env

const db = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}/test?retryWrites=true`

const pubsub = new PubSub()

const options = {
  port: process.env.PORT || '4000',
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

const context = {
  models,
  pubsub,
}

// Connect to MongoDB with Mongoose.
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

const server = new GraphQLServer({
  schema,
  context,
})

server.start(options, ({ port }) => {
  console.log(`🚀 Server is running on http://localhost:${port}`)
})
