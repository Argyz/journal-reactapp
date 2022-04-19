import { db } from "../firebase/firebase-config"


/*
a esta funcion la llamo desde appRouter
esto es debido a que tengo que llamarla bien obtenga el id de usuario,
y approuter es el primer lugar donde obtengo el id
*/
export const loadNotes=async(uid)=>{
    const noteSnap=await db.collection(`${uid}/journal/notes`).get();
    const notes=[];
    
    noteSnap.forEach(snapHijo=>{
        //dentro de cada snaphijo esta el id
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    });

    

    return notes;
}