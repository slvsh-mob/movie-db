import React from 'react'
import { MdViewModule } from 'react-icons/md'

const NavUser = () => {

    const handleRedirect = () => {
        window.location = "/user"
    }
    
    return(
        <div>
            <MdViewModule style={user_icon} onClick={handleRedirect}/>
        </div>
    );
}

const user_icon = {
    height: "6vh",
    width: "6vh",
    marginTop: "1vh",
    marginRight: "20px",
    color: "white"
}

export default NavUser