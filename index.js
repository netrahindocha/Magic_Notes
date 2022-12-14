// console.log("Welcome to Magic Notes App");

// In order to show all the old notes while loading the page, we need to include the showNotes function here 
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    // textarea id (addTxt)
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    // Notes saved previously ie old notes (notes)
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");
    // If no notes are stored previously, we will create an empty array to store the notes (notesObj)
    if (notes == null) {
        notesObj = [];
    }
    // If we have previously saved notes, we will add old notes (notes) to the new empty array (notesObj)
    else {
        notesObj = JSON.parse(notes);
    }
    // If no notes title are stored previously, we will create an empty array to store the notes title(titleObj)
    if (titles == null) {
        titleObj = [];
    }
    // If we have previously saved notes title, we will add old notes title (notes) to the new empty array (titleObj)
    else {
        titleObj = JSON.parse(titles);
    }
    // In order to add new notes to an Array, we need to add the textarea value (addTxt) to the notes array (notesObj)
    notesObj.push(addTxt.value);
    titleObj.push(addTitle.value);
    // Now we have to update the localStorage in order to save new notes into it and arrays can be stored directly into local storage that's why we convert it into string
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("titles", JSON.stringify(titleObj));
    // In order to clear the textarea (addTxt) after adding new note, we need to make the value empty
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    // In order to show the notes on clicking the button, we need to call the function inside addBtn event 

    let newNote = document.getElementById('newNote');
    newNote.style.display = 'none';
    document.getElementById("plus-inner").src = "add.png";

    showNotes();
})

// In order to display the old notes and newly added notes in Your Notes Section, we create showNotes function 
function showNotes() {
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");
    // For old notes, if present, add them to notes array else keep the notes array empty 
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";


    if (titles == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(titles);
    }
    // For each of the element in notes Array, we will build new note card for each of them 
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card cardTit" style="width: 18rem;" id="notesBorder">
                <div class="card-body">
                <div class="title-3-dots">
                    <h5 class="card-title">${titleObj[index]}</h5>
                </div>
                <p class="card-text" id="&nbsp;${index}" onclick="addCheckList(this.id)">${element}</p>
                <div class="margin">
                <button id="${index}" onclick="editNote(this.id)" class="editBtn"><img src="edit.png" alt=""></button>
                <button id="${index}" onclick="deleteNote(this.id)" class="deleteBtn"><img src="delete.png" alt=""></button>
                <span><i class="fa-solid fa-list-check checkListBtn" id="${index}" onclick="addCheckList(this.id)"></i></span>
                <button id="" class="textBtn"><img src="text.png" alt=""></button>
                </div>
            </div>
        </div>`

    });

    // titleObj.forEach(function(index){
    //     let cardTitle = document.getElementsByClassName('cardTitle');
    //     cardTitle.appendChild(addTitle);
    // })

    // If there are no notes, to display, print some content like not found, else show the notes
    // Here we fetch notes id from Your Notes Section  
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// In order to delete a note, we created a function called deleteNote

function deleteNote(index) {
    // console.log("I am deleting", index);

    // For old notes, if present, add them to notes array else keep the notes array empty 
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let titles = localStorage.getItem("titles");
    if (titles == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(titles);
    }

    if(confirm("Are you sure to delete it?") == true){
        notesObj.splice(index, 1);
        titleObj.splice(index, 1);
    }
    else{
        console.log("Not deleting");
    }

    // In order to delete a note from the notes array as per its index, we used splice function
    
    // Once we remove a note, we need to update the localStorage and convert the notes array into string
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("titles", JSON.stringify(titleObj));
    // In order to the update the changes to Your Notes section, we need to call the showNotes function 
    showNotes();
}

let notFound = document.getElementById('notFound');
notFound.style.display = 'none';

let not_found = new Boolean(true);

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    let not_found_bool = true;
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();

        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();

        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
            notFound.style.display = "none";
            not_found_bool = false;
        }

        else {
            element.style.display = "none";
        }
        
    })

    if(not_found_bool){
        notFound.style.display = "block";
    }
    else{
        notFound.style.display = "none";
    }

})



// Add more features: 
// 1. Add Title
// 2. Mark a note as Important
// 3. Separate notes by user
// 4. Sync and host to a web server


// Edit Note

// function editNote(editIndex){
//     let editTxt = document.getElementsByTagName('p');
//     editTxt.forEach((editIndex){
//         console.log(editIndex);
//     })
// };


let cardBody = document.getElementById('card-body');
// console.log(cardBody);
let addModify = document.createElement('button');
let modify = document.createTextNode('Modify Note');
addModify.appendChild(modify);
addModify.id = 'modifyBtn';
cardBody.appendChild(addModify);
modifyBtn.style.display = "none";

function editNote(editIndex) {
    // console.log(editIndex);
    // Assigning the text from the note index (obtained with button id)
    let words = notesObj[editIndex];
    addTxt.value = words;

    let label = titleObj[editIndex];
    addTitle.value = label;

    modifyBtn.style.display = "block";
    addBtn.style.display = 'none';

    let newNote = document.getElementById('newNote');
    newNote.style.display = 'block';
    document.getElementById("plus-inner").src = "minus.png";

    modifyBtn.addEventListener('click', () => {
        notesObj[editIndex] = addTxt.value;
        titleObj[editIndex] = addTitle.value;
        console.log(editIndex);
        console.log(notesObj[editIndex]);
        console.log(titleObj[editIndex]);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        localStorage.setItem("titles", JSON.stringify(titleObj));
        showNotes();
        modifyBtn.style.display = "none";
        addBtn.style.display = "block";
        editIndex = '';
        newNote.style.display = 'none';
        document.getElementById("plus-inner").src = "add.png";
        setTimeout(() => {
            addTxt.value = '';
            addTitle.value = '';
        }, 0);
    })
}

newNote.style.display = 'none';

let addNote = document.getElementById('plus-inner');

addNote.addEventListener('click', () => {
    newNote = document.getElementById('newNote');
    plusInner = document.getElementById('plus-inner');

    if (newNote.style.display == 'none') {
        document.getElementById("plus-inner").src = "minus.png";
        newNote.style.display = 'block';
    }
    else if (newNote.style.display == 'block') {
        document.getElementById("plus-inner").src = "add.png";
        newNote.style.display = 'none';
    }
});


// CHECKLIST 

let checkListBtn = document.getElementsByClassName("checkListBtn");


function addCheckList(index){

    let cardTxt = document.getElementsByClassName("card-text");
    // console.log(cardTxt[index]);
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    cardTxt[index].insertBefore(checkBox, cardTxt[index].firstChild);

    // console.log(notesObj[index]);

    // cardTxt.innerHTML = `<input type="checkbox" class="card-text" value="checklist"><label for="abcdefg ${notesObj[index]}"></label></input>`

    // notesObj.forEach(function(index){

    // })
};

