const fs = require('fs')
const fsPromises = require('fs/promises')

const asyncTask = (id, timeout, willFulFilled) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (willFulFilled === true) {
          // ce console.log simule un side effect
          console.log(`Log: task${id} done after ${timeout} seconds`)
          // la valeur de retour est contenu dans le resolve
          resolve(`result from task${id}`)
        } else {
          reject(new Error(`faillure from task${id}`))
        }
      }, timeout * 1000)
    })
  }


module.exports = asyncTask