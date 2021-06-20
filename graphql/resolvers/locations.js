const mongoose = require('mongoose');

const Location = require('../../models/Location');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        async createLocation(_, { name }, context) {
            const user = checkAuth(context);

            if (name.trim() === '') {
                throw new Error('Location name must not be empty');
            }

            const foundLocation = await Location.findOne({ 'name': name });

            if (!foundLocation) {
                const newLocation = new Location({
                    name,
                    user: user.id,
                    createdAt: new Date().toISOString()
                });
    
                const location = await newLocation.save();
    
                return location;   
            } else {
                return foundLocation;
            }
        }
    },
    Query: {
        async getLocations(_, {}, context) {
            const user = checkAuth(context);

            try {
                const locations = await Location.find({ 'user': user.id }).sort({ createdAt: -1 });
                return locations;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getLocation(_, { id }, context) {
            const user = checkAuth(context);

            try {
                const foundLocation = await Location.findOne({ '_id': id });
                return foundLocation;
            } catch (err) {
                throw new Error(err);
            }
        }      
    }
};