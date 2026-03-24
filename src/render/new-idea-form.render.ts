import { ideaForm } from "../ui/idea-form";

export function newIdeaFormRender() {
    const dom=ideaForm();
    dom.title.placeholder="Title Idea";
    dom.cancel.addEventListener("click",()=>alert("test"))
    ;
    dom.submit.textContent="new idea";
    dom.cancel.textContent="cancel";
    return dom.form;

}