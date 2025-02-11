const API_BASE_URL = "http://localhost:8080";
const send = `${API_BASE_URL}/notes`;
const search = `${API_BASE_URL}/search`;
let uid = localStorage.getItem("uid");


if (!uid) {
    uid = "user-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("uid", uid);
}

console.log("UID - " + uid);

function sendNote() {
    const content = document.getElementById("noteInput").value;
    if (!content) return alert("Please enter a note");

    fetch(`${send}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, userId: uid })
    }).then(response => response.json())
      .then(data => {
          alert("Note added successfully");
          document.getElementById("noteInput").value = "";
          fetchNotes();
      })
	.catch(error => console.error("Error Sending Note : ", error));
}

function fetchNotes() {
    fetch(`${send}/notes`)
        .then(response => response.json())
        .then(notes => {
            const notesList = document.getElementById("notesList");
            notesList.innerHTML = "";
            notes.forEach(note => {
                let li = document.createElement("li");
                li.textContent = `ID: ${note.id} - ${note.content}`;
                notesList.appendChild(li);
            });
        });
}

function searchNote() {
    const noteId = document.getElementById("searchId").value;
    if (!noteId) return alert("Please enter a note ID");

    fetch(`${search}/notes/${noteId}`)
        .then(response => response.json())
        .then(note => {
            const searchResult = document.getElementById("searchResult");
            searchResult.innerHTML = note ? `Found: ${note.content}` : "Note not found";
        });
}

fetchNotes();
