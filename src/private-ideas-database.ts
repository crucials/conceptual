let database: IDBOpenDBRequest | undefined = undefined

function openDatabase() {
    return window.indexedDB.open('ideas')
}

export function getPrivateIdeas() {
    if (!database) {
        database = openDatabase()
    }

    return '123'
}
