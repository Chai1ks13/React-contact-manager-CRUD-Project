import axios from "axios";
import { Link,useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
const EditContact = () => {

  let {contactId} = useParams()
    
  let navigate = useNavigate();

  const [state, setState] = useState({
      loading: false,
      contact: {
        name:'',
        photo:'',
        email:'',
        mobile:'',
        company:'',
        title:'',
        groupId:''
      },
      groups : [],
      errorMessage:''
  
      
  })

  useEffect(() => {
      const putContactData = async () => {
        setState({...state,loading:true})
          const response = await axios.get(`http://localhost:3500/contacts/${contactId}`)
          const groups = await axios.get('http://localhost:3500/groups');
          setState({
            ...state,
              loading:false,
              contact:response.data,
              groups:groups.data
          })
      }
      putContactData()
  }, [contactId])




  let EditContact = (e) => {
    setState({
      ...state,
      contact:{
        ...state.contact,
        [e.target.name]:e.target.value

      }
    })
    
  }
 
  let handleSubmit = async(e) => {
    e.preventDefault();  // To stop the loading of the page

    let response =await axios.put(`http://localhost:3500/contacts/${contactId}`, state.contact)
    if (response) {
      navigate("/", { replace: true });
    }
    else{
      console.error('error while loading')
    }
   
  }
  

  const {contact,loading,groups} = state
    return (
        <React.Fragment>
      
            <section className="Edit-contact">
                <div className=" container">
                    <p className="text-primary m-2 h3">Edit contact</p>
                    <p className=" mb-3 fst-italic">Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="row  align-items-center">
                            <div className="col-md-4">

                                <div class="form-group mb-2">
                                  <input value={contact.name} name = 'name' onChange={EditContact}
                                  type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div class="form-group mb-2">
                                <input value={contact.photo} name = 'photo' onChange={EditContact}
                                  type="text" className="form-control" placeholder="Image Url" />
                                </div>
                                <div class="form-group mb-2">
                                <input value={contact.email} name = 'email' onChange={EditContact}
                                  type="text" className="form-control" placeholder="Email" />
                                </div>
                                <div class="form-group mb-2">
                                <input value={contact.mobile} name = 'mobile' onChange={EditContact}
                                  type="number" className="form-control" placeholder="Mobie" />
                                </div>
                                <div class="form-group mb-2">
                                <input value={contact.company} name = 'company' onChange={EditContact}
                                   type="text" className="form-control" placeholder="Company" />
                                </div>
                                <div class="form-group mb-2">
                                <input value={contact.title} name = 'title' onChange={EditContact}
                                  type="text" className="form-control" placeholder="Title" />
                                </div>
                                <div class=" mb-2">
                                    <select value={contact.groupId} name = 'groupId' onChange={EditContact}
                                    className=" form-control">
                                      <option>
                                          select a group
                                      </option>
                                      {
                                        groups.length > 0 && groups.map((group) => {
                                          return(
                                            <option key={group.id} value = {group.id}>{group.name}</option>
                                          )
                                        })
                                      }
                                    </select>
                                </div> 
                                <div class="mb-2"> 
                                  <input type="submit" className=" btn btn-primary mx-2" value='Create'/>
                                  <Link to = {'/contacts/list'} className="btn btn-dark">Cancel</Link>
                               
                                  
                                </div>
                                
                            </div>
                            <div className="col-md-6">
                            <img src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg" className="user" alt="user-img"></img>
                                </div>
                           
                           
                        </div>
                    </form>
                </div>
            </section>








        </React.Fragment>
    )
}
 

export default EditContact;