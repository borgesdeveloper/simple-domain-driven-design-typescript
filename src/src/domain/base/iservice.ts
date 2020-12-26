export interface IService<T> {
    create(user: T): Promise<T>
    update(user: T) : void
    remove(uid: string): Promise<any>
    getById(uid: string): Promise<T>
    getAll(): Promise<Array<T>>
  }
  