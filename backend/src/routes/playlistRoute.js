import express from 'express';
import { addPlaylist, editPlaylist, listPlaylists, removePlaylist, addSongToPlaylist, removeSongFromPlaylist } from '../controllers/playlistController.js';
import upload from '../middleware/mutler.js'

const playlistRouter = express.Router();

playlistRouter.post('/add', addPlaylist);
playlistRouter.post('/edit', upload.single('image'), editPlaylist);
playlistRouter.get('/list', listPlaylists);
playlistRouter.post('/remove', removePlaylist);
playlistRouter.post('/add-song', addSongToPlaylist);
playlistRouter.post('/remove-song', removeSongFromPlaylist);

export default playlistRouter;
