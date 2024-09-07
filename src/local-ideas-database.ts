import { Idea, IdeaWithoutId } from '@/types/idea'

export class DatabaseOpeningFailedError extends Error {}
export class DatabaseNotInitializedError extends Error {}

export class LocalIdeasDatabase {
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

            try {
                this.database.deleteObjectStore(this.IDEAS_OBJECT_STORE_NAME)
            } catch (error) {
                console.log(
                    'no object stores to delete, database has been just created',
                )
            }

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
     * gets all ideas objects
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
     * gets an idea record by its id
     * @throws {DatabaseNotInitializedError} necessary method `open` has not been
     *  called, so the database is unavailable
     */
    getIdeaById(id: number) {
        if (!this.database) {
            throw new DatabaseNotInitializedError()
        }

        const objectStore = this.database
            .transaction(this.IDEAS_OBJECT_STORE_NAME)
            .objectStore(this.IDEAS_OBJECT_STORE_NAME)

        return new Promise<Idea>(resolve => {
            objectStore.get(id).addEventListener('success', event => {
                resolve((event.target as IDBRequest).result)
            })
        })
    }

    /**
     * creates new idea record
     * @throws {DatabaseNotInitializedError} necessary method `open` has not been
     *  called, so the database is unavailable
     * @returns created idea id
     */
    addIdea(idea: IdeaWithoutId) {
        if (!this.database) {
            throw new DatabaseNotInitializedError()
        }

        const objectStore = this.database
            .transaction(this.IDEAS_OBJECT_STORE_NAME, 'readwrite')
            .objectStore(this.IDEAS_OBJECT_STORE_NAME)

        return new Promise<number>(resolve => {
            objectStore.add(idea).addEventListener('success', event => {
                resolve((event.target as IDBRequest).result)
            })
        })
    }

    /**
     * replaces idea record with a new value
     * @throws {DatabaseNotInitializedError} necessary method `open` has not been
     *  called, so the database is unavailable
     * @returns replaced idea id
     */
    updateIdea(id: number, newValue: Idea) {
        if (!this.database) {
            throw new DatabaseNotInitializedError()
        }

        const objectStore = this.database
            .transaction(this.IDEAS_OBJECT_STORE_NAME, 'readwrite')
            .objectStore(this.IDEAS_OBJECT_STORE_NAME)

        return new Promise<number>(resolve => {
            objectStore.put(newValue).addEventListener('success', event => {
                console.log(event)
                
                resolve((event.target as IDBRequest).result)
            })
        })
    }
}
