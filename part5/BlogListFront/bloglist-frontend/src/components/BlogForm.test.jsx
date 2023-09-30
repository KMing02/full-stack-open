import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './CreateBlogForm'

test('create blog called when new blog created', async () => {
  const createNewBlog = jest.fn()
  const component = render(
    <BlogForm createNewBlog={createNewBlog}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('create')
  await user.click(button)

  expect(createNewBlog.mock.calls).toHaveLength(1)
})