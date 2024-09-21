import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connection established');
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/spotifys`);

        const db = mongoose.connection.db;
        const collection = db.collection('playlists');

        const indexes = await collection.indexes();

        const indexExists = indexes.some(index => index.name === 'name_1_userId_1');

        if (indexExists) {
            await collection.dropIndex('name_1_userId_1');
            console.log('Index name_1_userId_1 dropped successfully');
        } else {
            console.log('Index name_1_userId_1 not found');
        }

    } catch (error) {
        console.error('Error connecting to the database or dropping index:', error.message);
    }
}

export default connectDB;
