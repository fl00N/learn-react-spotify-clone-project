import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    image: { type: String, default: null },
    isAdminCreated: { type: Boolean, default: false },
    visibility: { type: String, enum: ['public', 'private'], default: 'private' },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
});

playlistSchema.index({ name: 1, userId: 1 }, { unique: true });

const playlistModel = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);

export default playlistModel;
