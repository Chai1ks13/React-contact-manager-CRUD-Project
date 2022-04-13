import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../spinner/Spinner";




const ViewContact = () => {

    let {contactId} = useParams()
    

    const [state, setState] = useState({
        loading: false,
        contact: {},
        groups : [],
        errorMessage:''
    
        
    })

    useEffect(() => {
        const postContactData = async () => {
            const contactData = await axios.get(`http://localhost:3500/contacts/${contactId}`)
            setState({
                loading:false,
                contact:contactData.data
            })
        }
        postContactData()
    }, [contactId])
    

    const {contact,loading} = state


    return (
        <React.Fragment>
           {
               loading ? <Spinner /> : 
               <>
               {
                   Object.keys(contact).length > 0 && 
                   <section className="view-contact p-3">
                   <div className=" container">
                       <p className=" h3 text-warning fw-bold">view contact</p>
                       <p className=" fst-italic  mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                           sollicitudin nulla eu nibh cursus, a fringilla metus maximus. Fusce
                           eu magna tincidunt, congue massa ut, semper magna. Suspendisse eu
                           sodales lacus. Proin accumsan, erat non interdum maximus, orci</p>
                       <div className=" row align-content-center">
                           <div className="col-md-2">
                               <img src={contact.photo} alt="contact" className="user-img"></img>
                           </div>
                           <div className="col-md-6">
                               <ul class="list-group">
                                   <li class="list-group-item list-group-item-action">Name : <span className=" fw-bold">{contact.name}</span></li>
                                   <li class="list-group-item list-group-item-action">Mobile no : <span className=" fw-bold">{contact.mobile}</span></li>
                                   <li class="list-group-item list-group-item-action">Mail : <span className=" fw-bold">{contact.email}</span></li>
                                   <li class="list-group-item list-group-item-action">Company : <span className=" fw-bold">{contact.company}</span></li>
                                   <li class="list-group-item list-group-item-action">Title : <span className=" fw-bold">{contact.title}</span></li>
                                   <li class="list-group-item list-group-item-action">Group : <span className=" fw-bold">{contact.groupId}</span></li>
                               </ul>
                           </div>
                           <div className="container">
                               <Link to={'/contacts/list'} className="btn btn-warning d-center">Cancel</Link>
                           </div>
                       </div>
   
                   </div>
   
   
   
   
   
   
   
   
               </section>
   
               }
               </>
           }



        </React.Fragment>
    )
}


export default ViewContact;