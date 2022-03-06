import { PostModel as Post } from '../models/PostModel.js'

// GET
// get posts
export const get = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// POST
// create post
export const create = async (req, res) => {
    const { title, description, url, status } = req.body

    // Simple validation
    if(!title) {
        return res.status(400).json({ success: false, message: "Title is required" })
    }
    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
            slug: title.replace(/ /g, '-').toLowerCase(),
        })
        await newPost.save()

        res.json({
            success: true,
            message: "Happy learning!",
            post: newPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// PUT
// update post
export const update = async (req, res) => {
    const { title, description, url, status } = req.body

    // Simple validation
    if(!title) {
        return res.status(400).json({ success: false, message: "Title is required" })
    }
    try {
        let updatedPost = {
            title,
            description: description || '',
            url: url.startsWith('https://') ? url : `https://${url}` || '',
            status,
            slug: title.replace(/ /g, '-').toLowerCase(),
            updatedAt: Date.now()
        }

        const postUpdatedCondition = {_id: req.params.id, user: req.userId}

        updatedPost = await Post.findOneAndUpdate(postUpdatedCondition, updatedPost, { new: true })
        
        // User not authorised to update post or post not found
        if(!updatedPost) {
            return res
                .status(401)
                .json({
                success: false,
                message: "Post not found or user not authorised",
            })
        }

        res.json({
            success: true,
            message: "Updated successfully",
            post: updatedPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const remove = async (req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition, )
        
        // User not authorised to update post or post not found
        if(!deletedPost) {
            return res
                .status(401)
                .json({
                success: false,
                message: "Post not found or user not authorised",
            })
        }

        res.json({
            success: true,
            message: "Deleted successfully",
            post: deletedPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}
