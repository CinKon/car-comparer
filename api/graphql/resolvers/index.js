import { mergeResolvers } from 'merge-graphql-schemas'

import Car from './Car/'
import User from './User/'
import Post from './Post/'
import Comment from './Comment/'

const resolvers = [Car, User, Post, Comment]

export default mergeResolvers(resolvers)
