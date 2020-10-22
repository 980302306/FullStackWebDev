import React, { Component } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


test('create a blog',() => {
  const mockHandler=jest.fn()
  
  const component=render(<BlogForm createBlog={mockHandler}/>)

  const inputTitle=component.container.querySelector('input[name="Title"]')
  const inputAuthor=component.container.querySelector('input[name="Author"]')
  const inputUrl=component.container.querySelector('input[name="Url"]')
  const form=component.container.querySelector('form')
  fireEvent.change(inputTitle,{
    target:{value:'testTitle'}
  })
  fireEvent.change(inputAuthor,{
    target:{value:'testAuthor'}
  })
  fireEvent.change(inputUrl,{
    target:{value:'testUrl'}
  })
  fireEvent.submit(form)
  expect(mockHandler.mock.calls).toHaveLength(1)
  const title=component.container.querySelector('#title')
  const author=component.container.querySelector('#author')
  const url=component.container.querySelector('#url')
  expect(title).toHaveTextContent('')
  expect(author).toHaveTextContent('')
  expect(url).toHaveTextContent('')
})