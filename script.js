const addButton = document.querySelector("#add");

const updateLSData=()=>{
    const textareaData=document.querySelectorAll('textarea');
    const notes=[];
    textareaData.forEach((note)=>{
        return notes.push(note.value)
    })
    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const htmlData = `
    <div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${
    text ? "hidden" : ""
  }" name="" id="" cols="29" rows="10"></textarea>`;
  note.insertAdjacentHTML("afterbegin", htmlData);

  const editbutton = note.querySelector(".edit");
  const deletebutton = note.querySelector(".delete");
  const maindiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  deletebutton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  textarea.value=text;
  maindiv.innerHTML=text;
  
  editbutton.addEventListener("click", () => {
      maindiv.classList.toggle('hidden');
      textarea.classList.toggle('hidden');
    });

  textarea.addEventListener('change',(event)=>{
  const value=event.target.value;
  maindiv.innerHTML=value;
  
    updateLSData();
  })

  document.body.appendChild(note);
};

const notes=JSON.parse(localStorage.getItem('notes'))
if (notes){notes.forEach((note)=> addNewNote(note))}


addButton.addEventListener("click", ()=> addNewNote());
