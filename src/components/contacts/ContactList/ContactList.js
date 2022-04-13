import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../spinner/Spinner";



const ContactList = () => {

  const [query, setQuery] = useState({
    text : ''
  })

  const [state, setState] = useState({
    loading : false,
    contacts : [],
    filteredContacts:[],
    errorMessage : ''
  });


  useEffect(() => {
  const getAllContacts = async () => {
    try {
      const response = await fetch('http://localhost:3500/contacts');
      const data = await response.json();
      setState({
        ...state,
        contacts:data,
        filteredContacts:data
      })
    } catch (error) {
      setState({
        ...state,
        loading:false,
        errorMessage:"fail to load"
      })
    }
  };
  getAllContacts();
  },[])

  // Delete contact
 
   let deleteTheContact = (contactId) => {
    const deleteData  = async() => {
     let response =  await fetch(`http://localhost:3500/contacts/${contactId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      })
   if (response) {
    const response = await fetch('http://localhost:3500/contacts');
    const data = await response.json();
    setState({
      ...state,
      contacts:data,
      filteredContacts:data
    })
   }
      
    }
    deleteData();
  }

  // Search contacts

  let searchContacts = (event) => {
    setQuery({
      ...query,
      text:event.target.value
    })
    let theContacts = state.contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setState({
      ...state,
      filteredContacts:theContacts
    })
  }
    

  const{contacts,loading,filteredContacts} = state;
       
  return (
   
     <React.Fragment>

     <section className="search my-2">
       <div className="container">
         <div className="row">
           <div className="col">
             <p className="h3">
               Phone Directory
               <Link to={"/contacts/add"} className="btn btn-primary mx-3">
                 <i className="bi bi-plus-circle fst-normal">   New</i>
               </Link>
             </p>
           </div>
         </div>
         <p className="fst-italic h5 mb-4">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
           sollicitudin nulla eu nibh cursus, a fringilla metus maximus. Fusce
           eu magna tincidunt, congue massa ut, semper magna. Suspendisse eu
           sodales lacus. Proin accumsan, erat non interdum maximus, orci
           mauris scelerisque sem, nec posuere metus erat quis est. Suspendisse
           vehicula sem quam. Nullam malesuada at ante ut aliquet. Duis tempor
           odio et mauris euismod dapibus.
         </p>

         <div className="row">
           <div className="col-md-6">
             <form className="row">
               <div className="col">
                 <input name="text" value={query.text} onChange = {searchContacts}
                   type="text"
                   placeholder="Search contacts"
                   className="form-control"
                 ></input>
               </div>
               <div className="col">
                 <input type="submit"
                   value="search"
                   className="btn btn-outline-dark">

                 </input>
               </div>
             </form>

           </div>
         </div>
       </div>
     </section>

{/* Contacts card section */}

{
  loading ? <Spinner /> : 
  <>
<section className="contacts-deatils">
       <div className="container">
         <div className="row">
         {filteredContacts.length > 0 && filteredContacts.map((contact) => {
                     return (
                       <div className="col-md-6" key={contact.id}>
                       <div className="card my-2">
                         <div className=" card-body">
                           <div className="row align-items-center d-flex justify-content-around">
                             <div className="col-md-4">
                               <img src={contact.photo} className="user" alt="user-img"></img>
                             </div>
                             <div className="col-md-7">
                               <ul class="list-group">
                                 <li class="list-group-item list-group-item-action">Name : <span className=" fw-bold">{contact.name}</span></li>
                                 <li class="list-group-item list-group-item-action">Mobile no : <span className=" fw-bold">{contact.mobile}</span></li>
                                 <li class="list-group-item list-group-item-action">Mail : <span className=" fw-bold">{contact.email}</span></li>
                               </ul>
                             </div>
                             <div className="col-md-1 d-flex flex-column align-items-md-center">
                               <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1" ><i class="bi bi-eye-fill"></i></Link>
                               <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1"><i class="bi bi-pencil-fill"></i></Link>
                               <button className="btn btn-danger" onClick={() =>deleteTheContact(contact.id) } ><i class="bi bi-trash my-1"></i></button>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                     )
                   })}
          
         </div>
       </div>
     </section>
  </>
}
  


   </React.Fragment>
   
  );
  };



export default ContactList;
