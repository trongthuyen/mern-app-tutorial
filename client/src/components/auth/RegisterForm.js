import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layouts/AlertMessage'

function RegisterForm() {
    // Context
    const { registerUser } = useContext(AuthContext)

    // Router
    const navigate = useNavigate()

    // Local state
    const [ registerForm, setRegisterFrom ] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [alert, setAlert] = useState(null)

    const onChangeRegisterForm = e => {
        setRegisterFrom({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }

    const register = async e => {
        e.preventDefault()

        if(registerForm.password !== registerForm.confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match' })
            setTimeout(() => setAlert(null), 5000)
            return
        }

        try {
            const registerData = await registerUser({
                username: registerForm.username,
                password: registerForm.password
            })
            if(!registerData.success) {
                setAlert(null)
                navigate('/login')
            } else {
                setAlert({
                    type: 'danger',
                    message: registerData.message
                })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form className='my-4' onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className='my-2'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        autoComplete='username'
                        value={registerForm.username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        autoComplete='current-password'
                        value={registerForm.password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        name='confirmPassword'
                        autoComplete='current-password'
                        required
                        value={registerForm.confirmPassword}
                        onChange={onChangeRegisterForm}
                        />
                </Form.Group>
                <Button variant='success' type='submit'>Register</Button>
            </Form>
            <p>
                Did you have account?
                <Link to='/login' style={{marginLeft: 8}}>
                    <Button variant="info" size='sm' className="ml-2">Login</Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm
