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

            const foundLocation = await Location.findOne({ 'name': name, 'user': user.id });

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
        },
        async updateLocationName(_, { location, name }, context) {
            checkAuth(context);

            const foundLocation = await Location.findOne({ '_id': location });

            if (foundLocation) {
                try {
                    await Location.updateOne(
                        { _id: location },
                        { $set: {"name" : name} }
                    );
    
                    return name;
                } catch (e) {
                    throw new Error("Unable to update location: " + e);
                }
            } else {
                throw new Error("Unable to find location to update");
            }
        },
        async removeLocation(_, { location }, context) {
            const user = checkAuth(context);
            try {
                const date = new Date()
                const expireDate = date.setDate(date.getDate() + 7);

                return await Location.updateMany({'user': user.id, 'id_': location}, { $set: { expireAt: expireDate } });
            } catch (err) {
                throw new Error(err);
            }
        },
        async removeUserLocations(_, {}, context) {
            const user = checkAuth(context);
            try {
                const date = new Date()
                const expireDate = date.setDate(date.getDate() + 7);

                return await Location.updateMany({'user': user.id, 'name': {$ne: 'Default Project'}}, { $set: { expireAt: expireDate } });
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Query: {
        async getLocations(_, {}, context) {
            const user = checkAuth(context);

            try {
                const locations = await Location.find({ 'user': user.id, 'expireAt': null }).sort({ createdAt: -1 });
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