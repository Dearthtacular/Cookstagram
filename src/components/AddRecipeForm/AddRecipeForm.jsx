import { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'


export default function AddPostForm({handleAddPost}){
    
    const [state, setState] = useState({
        caption: '',
        ingredients: ''
    })

    const [photo, setPhoto] = useState({})

    function handleFileInput(e){
        setPhoto(e.target.files[0])
    }

    function handleChange(e){
        setState({
            ...state, 
            [e.target.name]: e.target.value
        })
    }

    function handleKeyPress(e) {
      if (e.key === 'Enter' && e.shiftKey === false) {
        e.preventDefault();
        const { name, value } = e.target;
        const newValue = value + '\n';
        handleChange({ target: { name, value: newValue } });
      }
    }

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('caption', state.caption)
        formData.append('ingredients', state.ingredients)
        formData.append('photo', photo)
        handleAddPost(formData)
    }

    return (
    <Segment>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Input
            className="form-control"
            name="caption"
            value={state.caption}
            placeholder="What cookin' stuff you thinkin' about?"
            onChange={handleChange}
            required
          />
        <Form.TextArea
          className="form-control"
          name="ingredients"
          value={state.ingredients}
          placeholder="Measurements and types.  You know the drill"
          onChange={handleChange}
          onKeyDown={handleKeyPress} // Use onKeyDown event to detect Enter key
          required
        />
          <Form.Input
            className="form-control"
            type="file"
            name="photo"
            placeholder="upload dish image"
            onChange={handleFileInput}
          />
          <Button type="submit" className="btn">
            ADD DISH
          </Button>
        </Form>
      </Segment>
 
    );
}