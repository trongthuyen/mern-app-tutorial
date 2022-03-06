import authRouter from './auth.js'
import postRouter from './post.js'

function routeApp(app) {
    app.use('/api/auth', authRouter)
    app.use('/api/posts', postRouter)
}

export default routeApp
