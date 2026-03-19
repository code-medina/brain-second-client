

export function createIdeaCard()
{
    const root=document.createElement("div");
 
    const header=document.createElement("header");
    const footer=document.createElement("footer");
    const main=document.createElement("main");
    const title=document.createElement("h4");
    const description = document.createElement("p");


    header.append(title);
    main.append(description);
    root.append(header,main,footer);
    return {root,title,description,footer};

}