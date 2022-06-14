import { writable } from 'svelte/store'

const getNotes = (key) => {
    const persist = JSON.parse(localStorage.getItem(key)) || []
    const store = writable(persist)
    var notes;
    store.subscribe((note)=>{
        notes = note;
        return note;
    })
    return notes; 
}

const getStore = (key) => {
    const persist = JSON.parse(localStorage.getItem(key)) || []
    return writable(persist)
}

const store = {
    persistStore: (key, currentNote) => {
        let notes = getNotes(key);
        notes = [
            currentNote,
            ...notes
        ]
        localStorage.setItem(key, JSON.stringify(notes))
    },
    retrieveStore: (key) => {
        return getStore(key);
    },
    deleteItem: (key,id) => {
        let notes = getNotes(key);
        notes = notes.filter(note => note.id != id)
        localStorage.setItem(key, JSON.stringify(notes))
    }
}

export default store;