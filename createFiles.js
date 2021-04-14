const fsPromises = require('fs/promises')
const readlineSync = require('readline-sync')


const makeNewDirectory = async (name) => {
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


const readAndCopyDir = async () => {
    try {
        console.log('The fuck is the error')
        const stats = await fsPromises.stat('./directory')
        if(stats.isDirectory()) {
                console.log(`Is a directory`)
                const files = await fsPromises.readdir('./directory');
                if (files.length > 0) {
                   console.log(`contain ${files.length} files, are you sure you want to copy all of those ?`)
                   let  answer = readlineSync.question('Would you like to continue? Y or N ').toLocaleLowerCase()
                  if (answer === 'y') {
                    console.log('Copying the files...In a new directory')
                    await makeNewDirectory('newdirectory')
                     setTimeout(() => {
                       for (const file of files) {
                          fsPromises.writeFile('./newDirectory/'+file, 'utf-8')
                          console.log(`${file} is being copied`)
                       }
                    }, 2 * 1000);
                    ;
                    } else if (answer === 'n') {
                      console.log('Exiting...')
                      setTimeout(() => {
                         process.exit(1)
                      }, 2 * 1000);
                    
                    } 
                }
                
            }
        } 
        catch (err) {
        console.error(err);
        // If there's no direcory
        // If there's no files in directory
      }
}


readAndCopyDir()

