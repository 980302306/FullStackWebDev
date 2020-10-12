import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render ,fireEvent} from'@testing-library/react'
import ToggleBlog from './ToggleBlog'


describe('test ToggleBlog',() => {
  
  let component
  beforeEach(() => {
    component = render(
      <ToggleBlog title='testTitle' author='testAuthor'>
        <div className='url' />
        <div className='likes' />
      </ToggleBlog>
    )
  })
  
  test('display title and author by default',() => {
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('testAuthor')
    const div=component.container.querySelector('.ToggleBlogContent')
    expect(div).toHaveStyle('display:none')
  })

  test('url and like are shown after click', () => {
    const button=component.getByText('view')
    expect(button).toBeDefined()
    fireEvent.click(button)
    const div=component.container.querySelector('.ToggleBlogContent')
    expect(div).not.toHaveStyle('display:none')
  })
})

test('click like twice',() => {
  const mockHandler=jest.fn()
  const component = render(
    <ToggleBlog title='testTitle' author='testAuthor'>
      <div className='url' />
      <div className='likes' />
      <button onClick={mockHandler}>like</button>
    </ToggleBlog>
  )
  const viewButton=component.getByText('view')
  fireEvent.click(viewButton)
  const likeButton=component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})


