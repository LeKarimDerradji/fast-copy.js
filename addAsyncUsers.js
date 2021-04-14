
const fsPromises = require('fs/promises')

const USERS_FILE = 'users.json'

const addUser = async (name, age, isDev) => {
  try {
    const stat = await fsPromises.stat(USERS_FILE) // STEP 1 get Stats object
    if (stat.isFile()) {
      let jsonString = await fsPromises.readFile(USERS_FILE, 'utf-8') // STEP 2 read file
      const users = JSON.parse(jsonString)
      users[name] = { age: age, isDev: isDev }
      jsonString = JSON.stringify(users)
      await fsPromises.writeFile(USERS_FILE, jsonString) // STEP 3 write file
    }
  } catch (e) {
    // if USERS_FILE does not exist create it
    // and call again the function addUser
    if (e.code === 'ENOENT') {
      const emptyJsonString = '{}'
      await fsPromises.writeFile(USERS_FILE, emptyJsonString)
      await addUser(name, age, isDev)
    } else {
      // else just re throw error to caller
      throw e
    }
  }
}

const main = async () => {
  try {
     await addUser('alice', 28, true)
     await addUser('bob', 33, false)
     await addUser('charlie', 23, false)
     await addUser('dan', 45, true)
     await addUser('eve', 51, true)
  } catch (e) {
    console.error(`main: ${e.message}`)
  }
}

main()
