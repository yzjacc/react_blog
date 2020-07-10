var md = require('markdown-it')();
const fs = require('fs')
const path = require('path');
// const { isArray } = require('core-js/fn/array');
const dirname = path.join(__dirname,'../../_posts')
let files = fs.readdirSync(dirname);
let dataJsonList = []
for(let value of files) {
    
    if(!value.includes('md')) continue
    dataJson = {}
    dataJson['path']=  dirname +'/' + value
    dataJson['tag'] = []
    dataJson['year'] = value.split("-")[0]
    dataJson['month'] = value.split("-")[1]
    dataJson['day'] = value.split("-")[2]
    let content = fs.readFileSync(dirname+'/' + value ).toString()
    console.log(content.split("---")[1])
    let data = content.split("---")[1].split("\n")
    data.pop()
    data.shift()
    for(let value of data){
        if(value.split(":")[0] == 'title')
            dataJson['title'] = value.split(":")[1].split('\"')[1]
        if(value.split(":")[0].indexOf('-') == 0){
            dataJson['tag'].push(value.split(":")[0].split('-')[1])
        }
    }
    dataJsonList.push(dataJson)
}
function getContent (path){
    let content = fs.readFileSync(path).toString()
    return content.split("---")[2]
}

module.exports = {
    dataJsonList,
    getContent
}

