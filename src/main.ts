import { LocalStorageRespository } from './repositories/local-storage.repository'
import './style.css'

const repo = new LocalStorageRespository()
console.log(await repo.list())
await repo.create({description:"description test1"});
await repo.create({description:"description test2"});
await repo.create({description:"description test3"});
const lista=await repo.list();
const id=lista[0]._id;
repo.update({_id:id,description:"update test1"});
console.log(await repo.list());
repo.destroy(id);
console.log(await repo.list());



