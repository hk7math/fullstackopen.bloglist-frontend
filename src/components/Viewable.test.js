import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Viewable from './Viewable'

test('renders blog', () => {
  const blog = { 
    title: 'React patterns', 
    author: 'Michael Chan', 
    url: 'https://reactpatterns.com/', 
    likes: 7,
    id: 'idForTest'
  }

  const component = render(
    <Viewable blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'React patterns Michael Chan'
  )
})