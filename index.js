console.log("Welcome to magic notes");
// In order to show all the old notes while loading the page, we need to include the showNotes function here 
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e){

    // textarea id (addTxt)
    let addTxt = document.getElementById("addTxt");
    // Notes saved previously ie old notes (notes)
    let notes = localStorage.getItem("notes");
    // If no notes are stored previously, we will create an empty array to store the notes (notesObj)
    if(notes == null){
        notesObj = [];
    }
    // If we have previously saved notes, we will add old notes (notes) to the new empty array (noteObj)
    else{
        notesObj = JSON.parse(notes);
    }
    // In order to add new notes to an Array, we need to add the textarea value (addTxt) to the notes array (notesObj)
    notesObj.push(addTxt.value);
    // Now we have to update the localStorage in order to save new notes into it and arrays can be stored directly into local storage that's why we convert it into string
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // In order to clear the textarea (addTxt) after adding new note, we need to make the value empty
    addTxt.value = ""; 
    console.log(notesObj);
    // In order to show the notes on clicking the button, we need to call the function inside addBtn event 
    showNotes();
})

// In order to display the old notes and newly added notes in Your Notes Section, we create showNotes function 

function showNotes(){
    let notes = localStorage.getItem("notes");
    // For old notes, if present, add them to notes array else keep the notes array empty 
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    // console.log(notesObj);

    let html = "";
    // For each of the element in notes Array, we will build new note card for each of them 
    notesObj.forEach(function(element, index){
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`
    });
    // If there are no notes, to display, print some content like not found, else show the notes
    // Here we fetch notes id from Your Notes Section  
    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// In order to delete a note, we created a function called deleteNote


function deleteNote(index){
    console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    // For old notes, if present, add them to notes array else keep the notes array empty 
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    // In order to delete a note from the notes array as per its index, we used splice function
    notesObj.splice(index, 1);
    // Once we remove a notes, we need to update the localStorage and convert the notes array into string 
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // In order to the update the changes to Your Notes section, we need to call the showNotes function 
    showNotes();
}

// In order to add search functionality, we added input event to search input

// To fetch search input by its id named searchTxt (search)
let search = document.getElementById('searchTxt');
// Adding input event listener, so whenever we type anything even space in the input, the search function will execute
search.addEventListener("input", function(){
    // In order to fetch the value we entered in input
    let inputVal = search.value.toLowerCase();
    console.log("Input event fired!", inputVal);
    // In order to hide or show the entire the entire card, we select the entire div by className called noteCard (noteCards)
    let noteCards = document.getElementsByClassName('noteCard');
    // To select which cards to show among the array 
    Array.from(noteCards).forEach(function(element){
        // Fetching the element and the content inside its p tag (cardTxt)
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        // If the value inside the search input (inputVal) is included in the content inside the p tag (cardTxt), then we will display it else we will hide it
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })

})



