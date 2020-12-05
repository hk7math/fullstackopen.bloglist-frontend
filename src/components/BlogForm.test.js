import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const currentUser = {
  username: 'PPan',
  name: 'Peter Pan',
  id: 'idForUser',
  token: 'tokenForUser'
}

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  id: 'idForTest',
  user: currentUser
}

describe('<BlogForm />', () => {
  const popMsg = jest.fn()
  const setBlogs = jest.fn()
  const setToReload = jest.fn()
  test('submit a blog', () => {
    const component = render(
      <BlogForm user={currentUser} setBlogs={setBlogs} popMsg={popMsg} setToReload={setToReload} />
    )
    const spy = jest.spyOn(blogService, 'postBlog')
    const title = component.container.querySelector('input[name="title"]')
    const author = component.container.querySelector('input[name="author"]')
    const url = component.container.querySelector('input[name="url"]')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: blog.title }
    })
    fireEvent.change(author, {
      target: { value: blog.author }
    })
    fireEvent.change(url, {
      target: { value: blog.url }
    })
    fireEvent.submit(form)

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
