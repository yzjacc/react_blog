const path = require('path')
const fs = require('fs')
const { insertBlogs, getData, getBlogPage,getSingleLabel, getBlogCount, getSingleBlog, setBlogRead, getHotArticle, getAllLabel} = require('../services/db')
const dirname = path.join(__dirname,'../../_posts')
const sourceHandler = require('../utils/source-handler')

// 上传博客信息到数据库
async function updateBlog() {
  sourceHandler.dataJsonList.map(blog => {
    insertBlogs(blog.title, `${blog.tag}`, `${blog.year}-${blog.month}-${blog.day}`, blog.path)
  })
}

// 获取博客信息
async function getBlogs() {
  const data = await getData()
  const num = await getBlogCount()
  // 读取markdown文件信息
  data.map(blog => {
    blog.content = sourceHandler.getContent(blog.path)
  })
  return {blogs: data, blogCount: num}
}

// 分页获取博客信息
async function getBlogByPage(page) {
  const data = await getBlogPage(page)
  const num = await getBlogCount()
  data.map(blog => {
    blog.content = sourceHandler.getContent(blog.path)
  })
  return {blogs: data, blogCount: num}
}

async function getSingleTag(tag) {
  const data = await getSingleLabel(tag)
  data.map(blog => {
    blog.content = sourceHandler.getContent(blog.path)
  })
  return {blogs: data,blogCount: data.length}
}

async function labelTotal() {
  const data = await getAllLabel()
  // 读取markdown文件信息
  const labelList = []
  const labelObj = {}
  data.map(label => {
    label.label.split(',').map(demo => {
      labelList.push(demo)
    })
  })
  labelList.map(label =>{
    if(labelObj[label] == undefined){
      labelObj[label] = 1
    }
    else labelObj[label] = labelObj[label]+1;
  })
  return {labelList: labelObj, labelCount: Object.keys(labelObj).length }
}

async function getSingleBlogContent(id) {
  const arr = await getSingleBlog(id)
  const data = arr[0]
  data.content = sourceHandler.getContent(data.path)
  return data
}

async function plusVisit(id) {
  const result = await setBlogRead(id)
  return result
}

// 获取热榜
async function hotArticle() {
  const result = await getHotArticle()
  return result
}




module.exports = { updateBlog,getSingleTag, getBlogs, getBlogByPage, getSingleBlogContent, plusVisit, hotArticle, labelTotal}