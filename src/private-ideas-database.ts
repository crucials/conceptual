import { Idea, IdeaWithoutId } from '@/types/idea'

export class DatabaseOpeningFailedError extends Error {}
export class DatabaseNotInitializedError extends Error {}

export class PrivateIdeasDatabase {
    private readonly IDEAS_OBJECT_STORE_NAME = 'ideas'

    private database: IDBDatabase | undefined = undefined

    /**
     * requests indexed DB access, needed to be executed before getting the data
     * @throws {DatabaseOpeningFailedError} most likely user decided not to give your
     *  web app permission to create a database
     */
    open() {
        const request = window.indexedDB.open('ideas', 3)

        request.addEventListener('upgradeneeded', event => {
            this.database = (event.target as IDBOpenDBRequest).result
            this.database.deleteObjectStore(this.IDEAS_OBJECT_STORE_NAME)
            this.database.createObjectStore(this.IDEAS_OBJECT_STORE_NAME, {
                keyPath: 'id',
                autoIncrement: true,
            })
        })

        return new Promise<void>((resolve, reject) => {
            request.addEventListener('success', event => {
                this.database = (event.target as IDBOpenDBRequest).result
                resolve()
            })

            request.addEventListener('error', () => {
                reject()
            })
        })
    }

    /**
     * get all ideas objects
     * @throws {DatabaseNotInitializedError} necessary method `open` has not been
     *  called, so the database is unavailable
     */
    getIdeas() {
        if (!this.database) {
            throw new DatabaseNotInitializedError()
        }

        const objectStore = this.database
            .transaction(this.IDEAS_OBJECT_STORE_NAME)
            .objectStore(this.IDEAS_OBJECT_STORE_NAME)

        return new Promise<Idea[]>(resolve => {
            objectStore.getAll().addEventListener('success', event => {
                resolve((event.target as IDBRequest).result)
            })
        })
    }

    /**
     * creates new idea record
     * @throws {DatabaseNotInitializedError} necessary method `open` has not been
     *  called, so the database is unavailable
     */
    addIdea(idea: IdeaWithoutId) {
        if (!this.database) {
            throw new DatabaseNotInitializedError()
        }

        const objectStore = this.database
            .transaction(this.IDEAS_OBJECT_STORE_NAME, 'readwrite')
            .objectStore(this.IDEAS_OBJECT_STORE_NAME)

        return new Promise<Idea>(resolve => {
            objectStore.add(idea).addEventListener('success', event => {
                resolve((event.target as IDBRequest).result)
            })
        })
    }
}
