const fs = require('fs')
const path = require('path')
const R = require('ramda')

// 根据筛选条件读取文档结构
function readDirs(filter, dir) {
    return R.filter(filter)(fs.readdirSync(dir))
}

// 判断是否为文件夹
function isDir(filepath) {
  return fs.statSync(filepath).isDirectory()
}

/**
 * 构建文件树 解析markdown文件
 * 目录结构为:
 *  root
 * |-- label 标签
 *    |-- year 年份
 *        |-- month 月份
 *            |-- day 日期
 *                 |-- filename 文件名
 *
 */

 function readFilesTreeStructure(root, fn) {
  return R.pipe(
  R.map(label => R.pipe(
  R.pipe(
    R.map(year => R.pipe(
      R.pipe(
        R.map(month => R.pipe(
          R.pipe(
            R.map(day => R.pipe(
              R.map(filename => {
                const filePath = path.join(root, label, year, month, day, filename)
                fn(filePath, label, year, month, day, filename)
                return filePath
              }),
              R.objOf(day)
            )(readDirs(R.endsWith('.md'), path.join(root, label, year, month, day)))),
            R.reduce(R.mergeDeepLeft, {})
          ),
          R.objOf(month)
        )(readDirs(R.and(R.lte(1), R.gte(31)), path.join(root, label, year, month)))),
        R.reduce(R.mergeDeepLeft, {})
      ),
      R.objOf(year)
    )(readDirs(R.and(R.lte(1), R.gte(12)), path.join(root, label, year)))),
    R.reduce(R.mergeDeepLeft, {})
  ),
  R.objOf(label)
  )(readDirs(R.and(true), path.join(root, label)))),
  R.reduce(R.mergeDeepLeft, {})
  )(readDirs(R.and(true), root))
 }

 exports.traverse = function(root, fn) {
   if (!isDir(root)) {
     return {val: 'null'}
   } else {
     return readFilesTreeStructure(root, fn)
   }
 }
