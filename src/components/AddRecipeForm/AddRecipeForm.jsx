import { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

export default function AddRecipeForm({ handleAddRecipe }) {

  const [state, setState] = useState({
    caption: '',
    ingredients: '',
    instructions: ''
  })

  const [photo, setPhoto] = useState({})

  function handleFileInput(e) {
    setPhoto(e.target.files[0])
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleIngredientKeyPress(e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      const { name, value, selectionStart, selectionEnd } = e.target;
      const startOfLine = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const endOfLine = value.indexOf('\n', selectionEnd);
      const lineContent = value.substring(startOfLine, endOfLine === -1 ? value.length : endOfLine);
      let newValue = '';
      if (startOfLine === 0) {
        newValue = '•\u00a0' + lineContent.trim() + '\n' + value.substring(endOfLine === -1 ? value.length : endOfLine);
      } else {
        newValue = value.substring(0, startOfLine) + '•\u00a0' + lineContent.trim() + '\n' + value.substring(endOfLine === -1 ? value.length : endOfLine);
      }
      handleChange({ target: { name, value: newValue } });
    }
  }

  function handleInstructionKeyPress(e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      const { name, value, selectionStart } = e.target;
      const startOfLine = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const endOfLine = value.indexOf('\n', selectionStart);
      const lineContent = value.substring(startOfLine, endOfLine === -1 ? value.length : endOfLine);
      let newValue = '';
  
      // Extract all lines before the current line
      const linesBefore = value.substring(0, startOfLine).split('\n');
  
      // Determine the current line number
      const currentLineNumber = linesBefore.length;
  
      // Replace the bullet with the current line number
      const lineNumberedContent = currentLineNumber + '.\u00a0' + lineContent.trim();
  
      // Construct the new value with the numbered line
      newValue =
        value.substring(0, startOfLine) +
        lineNumberedContent +
        '\n' +
        value.substring(endOfLine === -1 ? value.length : endOfLine);
  
      handleChange({ target: { name, value: newValue } });
    }
  }
  

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('caption', state.caption)
    formData.append('ingredients', state.ingredients)
    formData.append('instructions', state.instructions)
    formData.append('photo', photo)
    handleAddRecipe(formData)
  }

  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="caption"
          value={state.caption}
          placeholder="Recipe Title"
          onChange={handleChange}
          required
        />
        <Form.TextArea
          className="form-control"
          name="ingredients"
          value={state.ingredients}
          placeholder="Ingredients (press enter for new bulleted line)"
          onChange={handleChange}
          onKeyDown={handleIngredientKeyPress}
          required
        />
        <Form.TextArea
          className="form-control"
          name="instructions"
          value={state.instructions}
          placeholder="Instructions (press enter for new numbered line)"
          onChange={handleChange}
          onKeyDown={handleInstructionKeyPress}
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