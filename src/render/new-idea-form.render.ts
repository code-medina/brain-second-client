import { ideaForm } from "../ui/idea-form";

export function newIdeaFormRender() {
    const dom=ideaForm();
    dom.title.placeholder="Title Idea";
   
    
    dom.submit.textContent="new idea";
    dom.cancel.textContent="cancel";
    return dom.form;

}