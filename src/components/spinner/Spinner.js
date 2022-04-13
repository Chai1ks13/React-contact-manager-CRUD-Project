import React from "react";
import spinnerImg from '../../Assests/Image/spinner.png'

const Spinner  = () => {
 
    return(

        <React.Fragment>

        <div>
            <img src= {spinnerImg} alt = 'spinner' className="spinner"></img>
        </div>
        </React.Fragment>
    )
}

export default Spinner;