import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from "../constants/actions"

export const PostReducer = (state, action) => {
    switch (action.type) {
        case POSTS_LOADED_SUCCESS: {
            return {
                ...state,
                posts: action.payload,
                postsLoading: false
            }
        }
        case POSTS_LOADED_FAIL: {
            return {
                ...state,
                posts: [],
                postsLoading: false
            }
        }
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, action.payload],
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
            }
        }
        case FIND_POST: {
            return {
                ...state,
                post: action.payload
            }
        }
        case UPDATE_POST: {
            const newPosts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            return {
                ...state,
                posts: newPosts,
            }
        }
        default: return state
    }
}