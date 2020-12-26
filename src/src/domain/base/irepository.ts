export interface IRepository<T> {
    create(user: T): Promise<T>
    update(user: T) : Promise<T>
    remove(uid: string): Promise<any>
    getById(uid: string): Promise<T>
    getAll(): Promise<Array<T>>
  }
  