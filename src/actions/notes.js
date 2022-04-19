import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = () => {
    return async (dispatch, getState) => {
        const state = getState().auth.uid;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const doc = await db.collection(`${state}/journal/notes`).add(newNote)

        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id,newNote));
    }
}


export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes,
    }
}


export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

});


export const addNewNote = (id, note) => {
    return {
        type: types.notesAddNew,
        payload: {
            id,
            ...note,
        }
    }
}


export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = (note) => {

    //estos 2 parametros los tengo gracias a thunk ya q es una tarea async
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if (!note.url) {
            delete note.url;
        }
        const noteToFirestore = { ...note };

        //elimino la propiedad id
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNote(note.id, note));

        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = (id, note) => {
    return {
        type: types.notesUpdated,
        payload: {
            id,
            note: {
                id,
                ...note
            }
        }
    }
}

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const activeNote = getState().notes.active;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));

    }
}

export const deleteNote = (id) => {
    return {
        type: types.notesDelete,
        payload: id,
    }
}

export const noteLogout = () => {
    return {
        type: types.notesLogoutCleaning,
    }
}