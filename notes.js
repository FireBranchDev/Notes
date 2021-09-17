// Creates a note and stores it in localstorage
// Return number
function createNote(title, notes) {
  if (title !== "" && notes !== "") {
    localStorage.setItem(title, notes);
    return localStorage.length;
  } else {
    return -1;
  }
}

// Gets a note using the key
// Return Array[string, string]
function getNote(key) {
  const item = localStorage.getItem(key);
  if (item == null) {
    return [];
  } else {
    return [key, item];
  }
}

function createNoteHandler() {
  const createNoteDivElement =
    document.getElementsByClassName("create-a-note-form")[0];
  const inputElement = createNoteDivElement.querySelector(
    'input[name="title"]'
  );
  const textAreaElement = createNoteDivElement.querySelector(
    'textarea[name="notes"]'
  );

  createNote(inputElement.value, textAreaElement.value);

  inputElement.value = "";
  textAreaElement.value = "";

  loadNotes();
}

function updateEditNoteForm(key) {
  const editNoteDivElement =
    document.getElementsByClassName("edit-a-note-form")[0];

  editNoteDivElement.classList.remove("hide");

  const inputElement = editNoteDivElement.querySelector('input[name="title"]');
  const textAreaElement = editNoteDivElement.querySelector(
    'textarea[name="notes"]'
  );

  const note = getNote(key);

  inputElement.value = note[0];
  textAreaElement.value = note[1];

  const editNoteButtonElement = editNoteDivElement.querySelector("button");

  editNoteButtonElement.addEventListener("click", () => {
    editNoteHandler(note[0]);
  });
}

function editNoteHandler(key) {
  const editNoteDivElement =
    document.getElementsByClassName("edit-a-note-form")[0];

  const inputElement = editNoteDivElement.querySelector('input[name="title"]');

  const textAreaElement = editNoteDivElement.querySelector(
    'textarea[name="notes"]'
  );

  const result = editNote(key, textAreaElement.value);

  editNoteDivElement.classList.add("hide");

  if (result > 0) {
    inputElement.value = "";
    textAreaElement.value = "";

    loadNotes();
  } else {
    console.log("Some error occured!");
  }
}

// Edit a note using a key
// Return number (total length of the localStorage) - if result fails a negative one
function editNote(key, notes) {
  const note = getNote(key);
  if (note == []) {
    return -1;
  } else {
    localStorage.setItem(key, notes);
    return localStorage.length;
  }
}

// Get all notes from localStorage
// Return an array of notes or null
function getNotes() {
  const notes = [];
  if (localStorage.length > 0) {
    let counter = 0;
    while (counter !== localStorage.length) {
      const key = localStorage.key(counter);
      const note = localStorage.getItem(key);
      notes.push([key, note]);
      counter++;
    }
    return notes;
  } else {
    return notes;
  }
}

// Delete a note using a key from local storage
// Return 1 if successful and negative one if not
function deleteNote(key) {
    const note = getNote(key);
    if (note == []) {
        return -1;
    } else {
        localStorage.removeItem(key);
        return 1;
    }
}

function deleteNoteHandler(key) {
    const result = deleteNote(key);
    if (result == 1) {
        loadNotes();
    } else {
        console.log("Note does not exist!");
    }
}

function loadNotes() {
  const notes = getNotes();

  const notesListElement = document.getElementById("notes").querySelector("div.notes-list");

  // Remove notes if they exist
  var child = notesListElement.lastElementChild;

  while (child) {
    notesListElement.removeChild(child);
    child = notesListElement.lastElementChild;
  }

  if (notes.length === 0) {
    const noNotesFoundElement = document.createElement("p");
    noNotesFoundElement.innerHTML = "No notes";
    notesListElement.appendChild(noNotesFoundElement);
  } else {
    notes.forEach((note) => {
      const noteElement = document.createElement("div");
      const noteH4Element = document.createElement("h4");
      const notePElement = document.createElement("p");
      const noteEditButtonElement = document.createElement("button");
      const noteDeleteButtonElement = document.createElement("button");

      noteElement.className += "note";
      noteH4Element.innerText = note[0];
      notePElement.innerText = note[1];

      noteEditButtonElement.innerText = "Edit note";
      noteDeleteButtonElement.innerText = "Delete note";

      noteEditButtonElement.addEventListener("click", () => {
        updateEditNoteForm(note[0]);
      });

      noteDeleteButtonElement.addEventListener("click", () => {
        deleteNoteHandler(note[0]);
      });

      noteElement.appendChild(noteH4Element);
      noteElement.appendChild(notePElement);
      notesListElement.appendChild(noteElement);
      notesListElement.appendChild(noteEditButtonElement);
      notesListElement.appendChild(noteDeleteButtonElement);
    });
  }
}

window.addEventListener("load", loadNotes());
