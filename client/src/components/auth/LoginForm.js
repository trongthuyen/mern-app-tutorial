import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layouts/AlertMessage'

function LoginForm() {
    // Context
    const { loginUser } = useContext(AuthContext)

    // Router
    const navigate = useNavigate()

    // Local state
    const [ loginForm, setLoginFrom ] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const onChangeLoginForm = e => {
        setLoginFrom({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const login = async e => {
        e.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success) {
                setAlert(null)
                navigate('/dashboard')
            } else {
                setAlert({
                    type: 'danger',
                    message: loginData.message
                })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form className='my-4' onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group className='my-2'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        autoComplete='username'
                        value={loginForm.username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        autoComplete='current-password'
                        value={loginForm.password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>Login</Button>
            </Form>
            <p>
                Don't you have account?
                <Link to='/register' style={{marginLeft: 8}}>
                    <Button variant="info" size='sm' className="ml-2">Register</Button>
                </Link>
            </p>
        </>
    )
}

export default LoginForm
