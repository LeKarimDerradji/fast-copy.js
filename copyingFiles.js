const fsPromises = require('fs/promises')
const readlineSync = require('readline-sync')

// Making a new directory based on user input 
const makeNewDirectory = async (name) => {
    console.log(`Creating a new directory named ${name}`)
    await fsPromises.mkdir(name, {
        recursive: true
    }, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('New directory successfully created.')
        }
    })
}

  

// Exiting if the answer is N 
const exiting = () => {
    console.log('Exiting...')

    setTimeout(() => {
        process.exit(1)
    }, 2 * 1000);
}

// Function to copy the retrieved files 
const copyFileFunc = async (datas, directoryName) => {
    let promises = []
    console.log('Copying files')
   await setTimeout(() => {
        for (const data of datas) {
            promises.push(fsPromises.writeFile(`./${directoryName}/${data}`, ''))
        }
    }, 2 * 1000);
    for (const promise in promises) {
        Promise.all(promise)
    }
    
} 

// Main Function
const readAndCopyDir = async () => {
    try {
        console.log('The fuck is the error: ')
        const stats = await fsPromises.stat('./directory')
        if (stats.isDirectory()) {
        console.log(`Is a directory`)
        const files = await fsPromises.readdir('./directory')

                if (files.length > 0) {
                console.log(`contain ${files.length} files, are you sure you want to copy all of those ? `)
                let answer = await readlineSync.question('Would you like to continue? Y or N ').toLocaleLowerCase()

                      if (answer === 'y') 
                      var directoryName = await readlineSync.question('How would you like your directory to be called ? ')
                            makeNewDirectory(directoryName)
                            copyFileFunc(files, directoryName)
                 }
                } else if (answer === 'n') {
                         exiting()
                 }

        } catch (err) {
        // If there's no direcory
        // If there's no files in directory
        }
}





readAndCopyDir()