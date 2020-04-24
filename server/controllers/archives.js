
const {getArchives} = require('../services/db')


async function getBlogsArchives() {
  let result = await getArchives()
}

module.exports = {getBlogsArchives}