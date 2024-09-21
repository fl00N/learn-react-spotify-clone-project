import { v2 as cloudinary } from "cloudinary";
import playlistModel from "../models/playlistModel.js";

const uploadToCloudinary = async (file, resourceType) => {
    if (file) {
        const upload = await cloudinary.uploader.upload(file.path, { resource_type: resourceType });
        return upload.secure_url;
    }
    return null;
};

const addPlaylist = async (req, res) => {
    try {
        const { name, userId, isAdmin } = req.body;
        const imageFile = req.file;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'UserId is required' });
        }

        const playlistCount = await playlistModel.countDocuments({ userId });
        const playlistName = name || `My playlist №${playlistCount + 1}`;
        const imageUrl = imageFile ? await uploadToCloudinary(imageFile, 'image') : null;

        const playlistData = {
            name: playlistName,
            userId,
            image: imageUrl,
            isAdminCreated: isAdmin || false,
            visibility: isAdmin ? 'public' : 'private',
        };

        const playlist = new playlistModel(playlistData);
        await playlist.save();

        res.status(201).json({ success: true, message: 'Playlist created successfully', playlist });
    } catch (error) {
        console.error('Error creating playlist:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const editPlaylist = async (req, res) => {
    try {
        const { playlistId, name } = req.body;
        const imageFile = req.file;

        let updatedData = { name };

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            updatedData.image = imageUpload.secure_url;
        }

        const updatedPlaylist = await playlistModel.findByIdAndUpdate(playlistId, updatedData, { new: true });

        res.status(200).json({ success: true, message: 'Playlist updated successfully', playlist: updatedPlaylist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId, userId } = req.body;

        const playlist = await playlistModel.findOne({ _id: playlistId, userId });

        if (!playlist) {
            return res.status(403).json({ success: false, message: 'You do not have permission to modify this playlist' });
        }

        const updatedPlaylist = await playlistModel.findByIdAndUpdate(
            playlistId,
            { $addToSet: { songs: songId } },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Song added to playlist', playlist: updatedPlaylist });
    } catch (error) {
        console.error('Error adding song to playlist:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });    }
};

const removeSongFromPlaylist = async (req, res) => {
    try {
        const { playlistId, songId, userId } = req.body;

        const playlist = await playlistModel.findOne({ _id: playlistId, userId });

        if (!playlist) {
            return res.status(403).json({ success: false, message: 'You do not have permission to modify this playlist' });
        }

        const updatedPlaylist = await playlistModel.findByIdAndUpdate(
            playlistId,
            { $pull: { songs: songId } },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Song removed from playlist', playlist: updatedPlaylist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const removePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.body;

        await playlistModel.findByIdAndDelete(playlistId);
        res.status(200).json({ success: true, message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const listPlaylists = async (req, res) => {
    try {
        const { userId, isAdmin } = req.query;
        const isAdminBool = isAdmin === 'true';

        let playlists;

        if (isAdminBool) {
            playlists = await playlistModel.find({ visibility: 'public' }).populate('songs');
        } else if (userId) {
            playlists = await playlistModel.find({
                $or: [
                    { userId: userId, visibility: 'private' },
                    { visibility: 'public' }
                ]
            }).populate('songs');
        } else {
            return res.status(400).json({ success: false, message: 'UserId is required for non-admin requests' });
        }

        res.status(200).json({ success: true, playlists });
    } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    addPlaylist,
    editPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    removePlaylist,
    listPlaylists
};
