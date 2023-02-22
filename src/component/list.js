import { useEffect, useState } from "react";
import Header from "./header";
function List() {
    const [add, setAdd] = useState(false);
    const [note, setNote] = useState('');
    const [list, setData] = useState([]);
    const [edit, setEdit]= useState(false);
    const [updateId, setUpdateId] = useState('');

    useEffect(()=>{
        if(localStorage.getItem('noteList') !='' && localStorage.getItem('noteList') !=null) setData(JSON.parse(localStorage.getItem('noteList')));
    },[add]);

    const saveNote=()=>{
        let time = new Date();
        time = `${time.getDate()}/${time.getMonth()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
        const userName = JSON.parse(localStorage.getItem('userData')).name;
        let data ={
            userId:userName,
            note: note,
            date : time
        }
        if(note !=''){
            let noteList =[];
            if(localStorage.getItem('noteList') !=''  && localStorage.getItem('noteList') !=null){
                noteList = JSON.parse(localStorage.getItem('noteList'));
            }
            noteList.push(data);            
            setData(prev => [...prev, data])
            console.log(noteList)
            localStorage.setItem('noteList', JSON.stringify(noteList));
            setNote('');
            setAdd(false);
        }else{
            alert('Enter text to add note!!')
        }
    }
    const deleteNote=(id)=>{
        let noteList = JSON.parse(localStorage.getItem('noteList'));
        noteList.splice(id, 1);
        setData(noteList);
        localStorage.setItem('noteList', JSON.stringify(noteList))
    }
    const editNote=(id)=>{
        setAdd(true)
        setEdit(true);
        setUpdateId(id);
        console.log(list[id]);
        setNote(list[id].note)
    }
    const updateNote=()=>{
        let time = new Date();
        time = `${time.getDate()}/${time.getMonth()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
        const userName = JSON.parse(localStorage.getItem('userData')).name;
        list[updateId] = {
            userId: userName,
            note: note,
            date : time
        };
        setData(list);
        localStorage.setItem('noteList', JSON.stringify(list));
        setNote('');
        setAdd(false)
        setEdit(false);
    }

    return (
        <>
        <Header />
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
                                            <td>{item.note}</td>
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
                                    onChange={(e)=>setNote(e.target.value)} placeholder="Enter note..."></textarea>
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