import { LocalStorageRespository } from './repositories/local-storage.repository'
import { IdeaService } from './services/idea.service'
import './style.css'


localStorage.clear()
const repo = new LocalStorageRespository()
const service = new IdeaService(repo)
console.log(await repo.list())


await service.create({ description: 'description test1' })
await service.create({ description: 'description test2' })
await service.create({ description: 'description test3' })
const lista = await service.getAll()
const id = lista[0]._id
await service.update({ _id: id, description: 'update test1' })
console.log(await service.getAll())
service.destroy(id)
console.log(await repo.list())
