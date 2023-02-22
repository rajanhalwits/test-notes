function CustomAlert(props){
    
    return(
        <>
            <div className="popupBg">
                <div className="popupBody">
                    <p>{props.title}</p>
                    {
                        props.msgType =='delete'?
                        <>
                            <button className="btn btn-danger btn-sm" onClick={()=>props.deleteAct('yes')}>Yes</button>
                            <button className="btn btn-primary btn-sm" onClick={()=>props.deleteAct('no')}>No</button>
                        </>
                        :
                        <button className="btn btn-success btn-sm" onClick={()=>props.updateAct()}>Yes</button>
                    }
                    
                </div>
            </div>
        </>
    )
}
export default CustomAlert;