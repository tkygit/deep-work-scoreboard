const usersResolvers = require('./users');
const projectsResolvers = require('./projects');
const projectTypesResolvers = require('./projectsTypes');
const locationsResolvers = require('./locations');
const sessionsResolvers = require('./sessions');

module.exports = {
    Mutation: {
        ...usersResolvers.Mutation,
        ...projectsResolvers.Mutation,
        ...projectTypesResolvers.Mutation,
        ...locationsResolvers.Mutation,
        ...sessionsResolvers.Mutation
    }
}