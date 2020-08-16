import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Viewable from './Viewable'

const currentUser ={
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

describe('<Viewable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Viewable blog={blog} currentUser={currentUser}/>
    )
  })

  test('renders component', () => {
    expect(
      component.container.querySelector('.blog')
    ).toBeDefined()
  })

  test('at start there are title and author', () => {
    expect(component.container)
      .toHaveTextContent('React patterns Michael Chan')

    expect(component.container)
      .not.toHaveTextContent('http')

    expect(component.container)
      .not.toHaveTextContent('like')
    })
    
  test('clicking view button shows url and like', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container)
      .toHaveTextContent('http')

    expect(component.container)
      .toHaveTextContent('like')
  })
})