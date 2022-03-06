import express from 'express'
import { PostController } from '../app/controllers/index.js'
import verifyToken from '../middlewares/auth.js'

const router = express.Router()

// GET
// get posts
router.get('/', verifyToken, PostController.get)

// POST
// create post
router.post('/', verifyToken, PostController.create)

// PUT
// update post
router.put('/:id', verifyToken, PostController.update)

// DELETE
// delete post
router.delete('/:id', verifyToken, PostController.remove)

export default router
