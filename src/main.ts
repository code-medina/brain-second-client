import './style.css'
import { IdeaService } from './services/idea.service'
import { CreateIdeaSchema } from './schemas/idea/create-idea.schema'
import { CreateKwoledgeSchema } from './schemas/knowledge/create-knowledge.schema'
import { CreateDevLogSchema } from './schemas/devlog/create-dev-log.schema'


const dtoCreate: CreateIdeaSchema = {
  description: 'hi',
}
const result = CreateIdeaSchema.safeParse(dtoCreate)
if (result.success) {
  console.log(result.data)
  IdeaService.create(result.data)
} else {
  console.log(result.error.issues) //array
}


const dtoKnowledge:CreateKwoledgeSchema={
    title: 'h',
    content: 'h'
};
const result2=CreateKwoledgeSchema.safeParse(dtoKnowledge);
if (result2.success) {
  console.log(result2.data)
} else {
  console.log(result2.error.issues) //array
}


const dtoDevLog:CreateDevLogSchema={
    content: 'h'
}
const result3=CreateDevLogSchema.safeParse(dtoDevLog);
if (result3.success) {
  console.log(result3.data)
} else {
  console.log(result3.error.issues) //array
}