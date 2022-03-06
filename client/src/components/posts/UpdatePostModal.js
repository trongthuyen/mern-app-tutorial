import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

function UpdatePostModal() {
    const {
        postState: {post},
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast
    } = useContext(PostContext)

    const [updatedPost, setUpdatedPost] = useState(post)

    useEffect(() => setUpdatedPost(post), [post])

    const { title, description, url, status } = updatedPost

    const onChangeUpdatePostForm = (event) => {
        setUpdatedPost({...updatedPost, [event.target.name]: event.target.value})
    }

    const closeDialog = () => {
        setUpdatedPost(post)
        resetUpdatePostData()
    }

    const onSubmit = async(event) => {
        event.preventDefault()
        const {success, message} = await updatePost(updatedPost)
        resetUpdatePostData()
        setShowToast({
            show: true,
            message: message,
            type: success ? 'success' : 'danger'
        })
    }

    const resetUpdatePostData = () => {
        setShowUpdatePostModal(false)
    }

    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='my-4'>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeUpdatePostForm}
                        />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control
                            as='textarea'
                            rows='3'
                            placeholder='Description'
                            name='description'
                            value={description}
                            onChange={onChangeUpdatePostForm}
                        />
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control
                            type='text'
                            placeholder='Youtube Tutorial Url'
                            name='url'
                            value={url}
                            onChange={onChangeUpdatePostForm}
                        />
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control
                            as='select'
                            name='status'
                            value={status}
                            onChange={onChangeUpdatePostForm}
                        >
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}lick>Cancel</Button>
                    <Button variant='primary' type='submit'>LearnIt!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal
