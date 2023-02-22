import { configureStore } from "@reduxjs/toolkit";
const initialState ={
    notes:[]
}
const notesReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'notes/addNote':
        return{
            ...state,
            notes : [...state.notes, action.payload]
        }
        case 'notes/deleteNote' :
            return {
                ...state,
                notes : state.notes.filter((note, index) => index !== action.payload)
            }
        default :
        return state;
    }
}
const store = configureStore({
    reducer:{
        notes : notesReducer
    }
});
export default store;