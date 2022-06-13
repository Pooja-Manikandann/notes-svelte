import {writable} from "svelte/store"

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];



const noteStore = {
    addNote: (note) => {
        var notes = JSON.parse(localStorage.getItem("notes") || "[]");
        const date = new Date();
        note.date = date.getDate() +" "+monthNames[date.getMonth()];
        notes.unshift(note);
        localStorage.setItem('notes',JSON.stringify(notes));
    },
    getAllNotes: () => {
        return JSON.parse(localStorage.getItem("notes") || "[]");
    }
}

export default noteStore;