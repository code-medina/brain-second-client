import type { IdSchema } from "../schemas/common/common.schema";
import type { CreateIdeaSchema } from "../schemas/idea/create-idea.schema";
import type { IdeaSchema } from "../schemas/idea/idea.schema";
import type { UpdateIdeaSchema } from "../schemas/idea/update-idea.schema";

export interface IdeaRepository{
    update(data:UpdateIdeaSchema):Promise<IdeaSchema>;
    destroy(id:IdSchema):Promise<void>;
    create(data:CreateIdeaSchema):Promise<IdeaSchema>;
    list():Promise<IdeaSchema[]>
}