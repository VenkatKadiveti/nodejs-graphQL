var mongodb = require('../../database/db')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')

var resolvers = {
    events: () => {
        return mongodb.client.collection('userEvents').find().toArray().then(result => {
            return result;
        }).catch(err => {
            throw err;
        });
    },
    createEvent: (args, req) => {
        // if (req.isAuth) {
            const event = {
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date,
                creator: args.eventInput.creator
            }
            return mongodb.client.collection('Users').find({ email: event.creator }).toArray().then(result => {
                if (result.length !== 0) {
                    return mongodb.client.collection('userEvents').insertOne(event).then(result => {
                        return { ...result.ops[0] }
                    }).catch(err => {
                        throw err
                    })
                } else {
                    return new Error('User Not Found');
                }
            }).catch(err => {
                throw err;
            })
        // } else {
        //     return new Error('Authentication Failed...!')
        // }
    },
    createUser: (args) => {
        return mongodb.client.collection('Users').find({ email: args.userData.email }).toArray().then(result => {
            if (result.length === 0) {
                return bcrypt.hash(args.userData.password, 12).then(hashedPassword => {
                    const user = {
                        first_name: args.userData.first_name,
                        last_name: args.userData.last_name,
                        email: args.userData.email,
                        password: hashedPassword,
                    }
                    return mongodb.client.collection('Users').insertOne(user).then(result => {
                        return `${result.ops[0].first_name}.${result.ops[0].last_name} added Successfully`;
                    }).catch(err => { throw err })
                }).catch(err => { throw err });
            } else {
                return `${args.userData.first_name}.${args.userData.last_name} already exists`
            }
        }).catch(err => {
            throw err;
        })
    },
    isAuth: (args) => {
        const user = {
            email: args.auth.email,
            password: args.auth.password
        };
        return mongodb.client.collection('Users').find({ email: user.email })
            .toArray()
            .then(result => {
                if (result && result.length > 0) {
                    return bcrypt.compare(user.password, result[0].password).then(userData => {
                        if (userData) {
                            const token = jwt.sign({ userId: result[0].email, fname: result[0].first_name, lname: result[0].last_name }, 'miraclesoft.com',
                                { expiresIn: '1h' });
                            return {
                                first_name: result[0].first_name,
                                last_name: result[0].last_name,
                                email: result[0].email,
                                token: token,
                                _id: result[0]._id
                            };
                        } else {
                            return new Error('Password Incorrect.');
                        }
                    }).catch(err => {
                        throw err;
                    })
                } else {
                    return new Error('User Not Found...!');
                }
            }).catch(err => {
                throw err;
            })
    },
    getUsers: () => {
        return mongodb.client.collection('Users').find().toArray().then(users => {
            return users;
        }).catch(err => {
            throw err;
        })
    },

    getUser: (args) => {
        return mongodb.client.collection("Users").find({ email: args.email }).toArray().then(userData => {
            if (userData && userData.length > 0) {
                return userData;
            }else{
                return new Error('User Not Found.')
            }

        }).catch(err => {
            console.log('err', err.message)
            throw  err.message;
        })
    }
}

module.exports = resolvers;