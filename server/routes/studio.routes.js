import { Router } from 'express';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js'
import { createStudio, getAllStudios, removeStudio, updateStudio } from '../controllers/studio.controller.js';

const router = Router();

// another way more power 
router.route('/')
.get(getAllStudios)
.post(
    // isLoggedIn,
    // authorizedRoles('ADMIN'),
    upload.array('images', 4),
    createStudio)

//TODO: agar user ne payment nahi kiya to usko lectures details nahi dikhne chahiye to uske liye middleware 
router.route('/:id')
.put(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('thumbnail'),
    updateStudio)
.delete(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    removeStudio)

export default router;