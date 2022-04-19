import React, { useEffect, useRef } from 'react';
import { NoteAppBar } from './NoteAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';


export const NoteScreen = () => {

  const dispatch = useDispatch();
  const note = useSelector(state => state.notes.active);
  const [value, handleInputChange, reset] = useForm(note);
  const { body, title,id } = value;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {

    dispatch(activeNote(value.id, { ...value }));
  }, [value, dispatch]);

  const handleDelete=()=>{
    dispatch(startDeleting(id));
  }

  return (
    <div className='notes__main-content'>
      <NoteAppBar />

      <div className='notes__content'>
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete='off'
          name='title'
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder='Whats happened today'
          className='notes__textarea'
          name='body'
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {
          (note.url) &&
          (<div className='notes__image'>
            <img src={note.url} alt="next" />
          </div>)
        }
      </div>


      <button 
        className='btn btn-danger'
        onClick={handleDelete}
      >
        Delete
      </button>


    </div>
  )
}
