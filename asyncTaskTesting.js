const asyncTask = require('./moduleAsyncTask/asyncTask')



const main = async () => {
    await asyncTask(1, 5, true)
    asyncTask(1, 3, true)
}

main()