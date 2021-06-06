const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicates = notes.filter((note) => note.title === title);
    if (duplicates.length === 0) {
        notes.push({ title: title, body: body });
        saveNotes(notes);
        console.log(chalk.bgGreen.black("new note added!"));
    } else {
        console.log(chalk.bgRed.black("Note title already exist!"));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const reqNotes = notes.filter((note) => (title !== note.title));
    if (reqNotes.length < notes.length) {
        saveNotes(reqNotes);
        console.log(chalk.bgGreen.black("Note removed successfully!"));
    } else {
        console.log(chalk.bgRed.black("Note not found!"));
    }
}

const listNotes = () => {
    console.log(chalk.green.inverse("Your notes..."));
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNotes = (title)=>{
    const notes = loadNotes();
    const getNote = notes.find((note) => {
      return note.title === title;
    }); 
    if(getNote)
        console.log(chalk.bgCyan.black.italic(getNote.body));
    else
        console.log(chalk.bgRed.black('No note found!')); 
}

function saveNotes(notes) {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNotes 
};