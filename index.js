// console.log("Welcome to Magic Notes App");

// In order to show all the old notes while loading the page, we need to include the showNotes function here 
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    // textarea id (addTxt)
    let addTxt = document.getElementById("addTxt");
    // Notes saved previously ie old notes (notes)
    let notes = localStorage.getItem("notes");
    // If no notes are stored previously, we will create an empty array to store the notes (notesObj)
    if (notes == null) {
        notesObj = [];
    }
    // If we have previously saved notes, we will add old notes (notes) to the new empty array (noteObj)
    else {
        notesObj = JSON.parse(notes);
    }
    // In order to add new notes to an Array, we need to add the textarea value (addTxt) to the notes array (notesObj)
    notesObj.push(addTxt.value);
    // Now we have to update the localStorage in order to save new notes into it and arrays can be stored directly into local storage that's why we convert it into string
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // In order to clear the textarea (addTxt) after adding new note, we need to make the value empty
    addTxt.value = "";
    // console.log(notesObj);
    // In order to show the notes on clicking the button, we need to call the function inside addBtn event 
    showNotes();
})

// In order to display the old notes and newly added notes in Your Notes Section, we create showNotes function 
function showNotes() {
    let notes = localStorage.getItem("notes");
    // For old notes, if present, add them to notes array else keep the notes array empty 
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    // For each of the element in notes Array, we will build new note card for each of them 
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <div class="margin">
                <button id="${index}" onclick="editNote(this.id)" class="editBtn">Edit Note</button>
                <button id="${index}" onclick="deleteNote(this.id)" class="deleteBtn">Delete Note</button>
                </div>
            </div>
        </div>`

    });

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

    // In order to delete a note from the notes array as per its index, we used splice function
    notesObj.splice(index, 1);
    // Once we remove a note, we need to update the localStorage and convert the notes array into string
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // In order to the update the changes to Your Notes section, we need to call the showNotes function 
    showNotes();
}


let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
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

    modifyBtn.style.display = "block";
    addBtn.style.display = 'none';



    modifyBtn.addEventListener('click', () => {
        notesObj[editIndex] = addTxt.value;
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
        modifyBtn.style.display = "none";
        setTimeout(() => {
            addTxt.value = '';
        }, 0);
    })
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
