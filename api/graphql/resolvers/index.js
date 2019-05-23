import { mergeResolvers } from 'merge-graphql-schemas';

import Car from './Car/';

const resolvers = [Car];

export default mergeResolvers(resolvers);
