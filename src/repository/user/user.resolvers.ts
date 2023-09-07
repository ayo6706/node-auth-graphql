import UserService from '../../services/user';

const resolvers = {
  Mutation: {
   ...UserService
  },
};

export default resolvers;