import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./logout";

function Header(){
    const [profile, setProfile] = useState([])
    useEffect(()=>{
        if(localStorage.getItem('userData') !='' && localStorage.getItem('userData') !=null) {
            setProfile(JSON.parse(localStorage.getItem('userData')))
        }
    },[])  ;
    return(
        <div className='row headerBg'>
            <div className='col-lg-1'>
                  <img src="./logo.jpg" className="img-fluid" style={{height:'60px'}} alt="Logo" />
            </div>
            <div className='col-lg-11'>
                <ul className="navbar-menu">
                    <li>
                        <Link to="/list">List</Link>
                    </li>
                    <li>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {profile.name} <img src={profile.picture} className="userImage" alt="user profile" />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Logout /></li>
                            </ul>
                        </div>
                    </li>
                </ul>
                
            </div>
        </div>
    )
}
export default Header;