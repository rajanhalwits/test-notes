import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
function Logout(){
    const navigate = useNavigate();
    const logOut=()=>{
        googleLogout();
        localStorage.removeItem("userData");
        navigate('/');
    }
    return(
           <span className="btnLogout" onClick={()=>logOut()}>Logout</span>
    )
}
export default Logout;