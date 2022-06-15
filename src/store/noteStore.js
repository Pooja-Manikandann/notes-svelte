import { writable } from 'svelte/store'

const getNotes = (key) => {
    const notes = JSON.parse(localStorage.getItem(key)) || []
    return notes; 
}


const persist = JSON.parse(localStorage.getItem("notes")) || []
const noteStore = writable(persist)

const store = {
    persistStore: (key, currentNote) => {
        let notes = getNotes(key)
        notes = [
            currentNote,
            ...notes
        ]
        localStorage.setItem(key, JSON.stringify(notes))
        noteStore.set(notes)
    },
    retrieveStore: (key) => {
        return noteStore;
    },
    deleteItem: (key,id) => {
        let notes = getNotes(key);
        notes = notes.filter(note => note.id != id)
        localStorage.setItem(key, JSON.stringify(notes))
        noteStore.set(notes)
    }
}

export default store;