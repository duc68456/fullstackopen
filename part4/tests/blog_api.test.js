const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach (async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('the blog list application returns the correct amount of blog posts', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  // console.log(blogs)
  assert.strictEqual(blogs.length, helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  for (const blog of blogs) {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  }
})

test('making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
  const newBlog = {
    'title': 'test HTTP POST',
    'author': 'test3',
    'url': 'url3',
    'likes': 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(helper.initialBlogs.length + 1, blogsAtEnd.length)
  // console.log(blogsAtEnd[blogsAtEnd.length - 1])
  assert.deepStrictEqual(newBlog.title, blogsAtEnd[blogsAtEnd.length - 1].title)
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    'title': 'test value 0 for property likes',
    'author': 'test4',
    'url': 'url4'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})

test('if the title or url properties are missing, responds to the request with the status code 400', async () => {
  const blogWithoutTitle = {
    'author': 'test5',
    'url': 'url5',
    'likes': 0
  }
  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)
})

test('delete a single blog post resource', async () => {
  const blogs = await helper.blogsInDb()
  const idToDelete = blogs[0].id
  const deletedBlog = await api
    .delete(`/api/blogs/${idToDelete}`)
    .expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  assert.strictEqual(deletedBlog.id, helper.initialBlogs[0].id)
})

test('update the information of an individual blog post', async () => {
  const blogToUpdate = {
    'title': 'updatedBlog',
    'author': 'test6',
    'url': 'url6',
    'likes': 999
  }
  const blogs = await helper.blogsInDb()
  const idToUpdate = blogs[0].id
  // console.log('update test', idToUpdate)
  const updatedBlog = await api
    .put(`/api/blogs/${idToUpdate}`)
    .send(blogToUpdate)
    .expect(200)
  const blogsAtEnd = await helper.blogsInDb()
  // console.log(blogsAtEnd[0])
  assert.strictEqual(helper.initialBlogs.length, blogsAtEnd.length)
  assert.strictEqual(blogsAtEnd[0].title, blogToUpdate.title)
})

after(async () => {
  await mongoose.connection.close()
})
