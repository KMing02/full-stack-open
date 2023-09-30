import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import axios from 'axios'


describe('Blog test', () => {
  let user = {
    username: 'oooo',
    name: 'otto',
    id: '650b07d0bbd9f145ed7f3f8c'
  }

  let blog = {
    title:'React patterns',
    author:'Michael Chan',
    url:'https://reactpatterns.com/',
    likes:7,
    user:[user]
  }


  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()
  let userMock = jest.fn()

  test('show title and author by default', async () => {
    const component = render(
      <Blog blog={blog} update={mockUpdateBlog} deleteBlog={mockDeleteBlog} user={userMock}/>
    )

    screen.debug()

    const titleAndAuthor = component.container.querySelector('.title-author')
    expect(titleAndAuthor).toHaveTextContent('React patterns - Michael Chan')

    const url = component.container.querySelector('.url')
    expect(url).not.toBeVisible()

    const likes = component.container.querySelector('.like')
    expect(likes).not.toBeVisible()
  })

  test('clicking the view button displays url and number of likes', async () => {
    const component = render(
      <Blog blog={blog} update={mockUpdateBlog} deleteBlog={mockDeleteBlog} user={userMock}/>
    )

    const user = userEvent.setup()
    const button = component.getByText('view')
    await user.click(button)

    const url = component.container.querySelector('.url')
    expect(url).toBeVisible()

    const likes = component.container.querySelector('.like')
    expect(likes).toBeVisible()
  })


  jest.mock('axios')
  test('clicking like button twice', async () => {
    const update = jest.fn().mockResolvedValue({ data: {
      title:'React patterns',
      author:'Michael Chan',
      url:'https://reactpatterns.com/',
      likes:7,
      user:[userMock]
    },
    })

    const thisuser = userEvent.setup()

    const component = render(
      <Blog blog={blog} update={update} deleteBlog={mockDeleteBlog} user={userMock}/>
    )

    const button = screen.getByText('view')
    await thisuser.click(button)

    const likeButton = screen.getByText('like')
    await thisuser.click(likeButton)
    await thisuser.click(likeButton)

    expect(update).toHaveBeenCalledTimes(2)
  })
})