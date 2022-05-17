import mongoose from 'mongoose';

let db;

export const ConnectToDB = async () => {
    const connectionString = process.env.ATLAS_URI;

    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            console.log("Error connecting to database: ", err);
        }
    });

    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to database', db.name);
    });
};

export const getDB = () => {
    return db;
}

export const getUsers = async () => {
    const users = await db.collection('users').find({}).toArray();
    return users;
}