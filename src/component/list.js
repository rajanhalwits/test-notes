import { useEffect, useState } from "react";
import Header from "./header";
import CustomAlert from "./CustomAlert";
import { useSelector, useDispatch } from "react-redux";

function List() {
    const [add, setAdd] = useState(false);
    const [note, setNote] = useState('');
    const [list, setData] = useState([]);
    const [edit, setEdit]= useState(false);
    const [id, setId] = useState('');
    const [msg, setMsg] = useState('');
    const [msgType, setMsgType] = useState('');
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem('userData')).name);
    

    useEffect(()=>{
        if(localStorage.getItem('noteList') !='' && localStorage.getItem('noteList') !=null) {
            setData(JSON.parse(localStorage.getItem('noteList')));
        }
    },[add]);

    const notes = useSelector(state => state.notes.notes);
    console.log('data with redux toolkit', notes)
    const dispatch = useDispatch();

    const currentTime=()=>{
        let time = new Date();
        return `${time.getDate()}/${time.getMonth()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`
    }
    const saveNote=()=>{
        let data ={
            userId:userName,
            note: note,
            date : currentTime()
        }
        if(note !=''){
            let noteList =[];
            if(localStorage.getItem('noteList') !=''  && localStorage.getItem('noteList') !=null){
                noteList = JSON.parse(localStorage.getItem('noteList'));
            }
            noteList.push(data);            
            setData(prev => [...prev, data])
            localStorage.setItem('noteList', JSON.stringify(noteList));
            dispatch({type: 'notes/addNote', payload: data});

            setMsg('Note Added successfully!');
            setMsgType('add');
            setNote('');
            setAdd(false);
        }else{
            alert('Enter text to add note!!')
        }
    }
    const deleteAct=(action)=>{
       if(action =='yes'){
            let noteList = JSON.parse(localStorage.getItem('noteList'));
            noteList.splice(id, 1);
            setData(noteList);
            dispatch({type: 'notes/deleteNote', payload: id});
            localStorage.setItem('noteList', JSON.stringify(noteList))
       }
        setMsg('')
    }
    const updateAct=()=>{
        setMsg('');
    }
    const deleteNote=(id)=>{
        setMsgType('delete')
        setMsg(`Are you sure you want to delete S.No.${id+1}?`);
        setId(id)
    }
    const editNote=(id)=>{
        setAdd(true)
        setEdit(true);
        setId(id);
        setNote(list[id].note)
    }
    const updateNote=()=>{
        list[id] = {
            userId: userName,
            note: note,
            date : currentTime()
        };
        setData(list);
        localStorage.setItem('noteList', JSON.stringify(list));
        setMsg('Note updated successfully!');
        setMsgType('update');
        setNote('');
        setAdd(false)
        setEdit(false);
    }

    return (
        <>
        <Header />
        {msg !='' && <CustomAlert title={msg} deleteAct={deleteAct} updateAct={updateAct} msgType={msgType} />}
        <div className="row listBg">
            <div className="col-lg-12">
                <div className="container">
                    <div className="row">
                        <h4>{add ? 'Add Note'  : 'Notes'} 
                            <button className="btn btn-primary pull-right" 
                            onClick={()=>setAdd(!add)}>{add ? 'Notes List' : 'Add Note'}</button></h4>
                    </div>
                    {
                        !add ?
                        <div className="row table-responsive">
                            <table className="table table-bordered table-striped noteTable">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Notes</th>
                                        <th>Added By</th>
                                        <th>Added on</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.length >0 ?
                                        list.map((item, index)=>
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td><pre style={{fontFamily:"cursive"}}>{item.note}</pre></td>
                                            <td>{item.userId}</td>
                                            <td>{item.date}</td>
                                            <td>
                                                <button className="btn btn-info btn-sm"
                                                onClick={()=>editNote(index)}
                                                >Edit</button>
                                                <button className="btn btn-danger btn-sm" style={{marginLeft:'10px'}}
                                                onClick={()=>deleteNote(index)}>Delete</button>
                                            </td>
                                        </tr>
                                        )
                                        : 
                                        <tr>
                                            <td colSpan={5}>No record found</td>
                                        </tr>
                                    }
                                    
                                </tbody>
                            </table>
                            
                        </div>
                        :
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="col-lg-6 offset-lg-3 loginBox">
                                    <p>{edit ? 'Update' : 'Add'} Note </p>
                                    <textarea className="form-control" value={note}
                                    onChange={(e)=>setNote(e.target.value)} style={{fontFamily:"cursive"}} placeholder="Enter note..."></textarea>
                                    {
                                        !edit ?
                                        <button className="btn btn-success addBtn" onClick={()=>saveNote()}
                                    >Add Note</button>
                                        : 
                                        <button className="btn btn-success addBtn" onClick={()=>updateNote()}
                                    >Update Note</button>
                                }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        
        </>
    )
}
export default List;