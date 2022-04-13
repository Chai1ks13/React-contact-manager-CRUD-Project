import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useNavigate  } from "react-router-dom";

const AddContact = () => {

  let navigate = useNavigate();

const [state,setState] = useState({
    loading:false,
    contact:{
      name:'',
      photo:'',
      email:'',
      mobile:'',
      company:'',
      title:'',
      groupId:''
},
    groups:[],
    errorMessage:''
})
useEffect(() => {
  const getAllGroups = async () => {
    try {
      const response = await fetch('http://localhost:3500/groups');
      const data = await response.json();
      setState({
        ...state,
        groups:data
      })
    } catch (error) {
      setState({
        ...state,
        loading:false,
        errorMessage:"fail to load"
      })
    }
  };
  getAllGroups();
  },[])





let updateInput = (event) => {
setState({
  ...state,
  contact:{
    ...state.contact,
    [event.target.name]:event.target.value
  }
})
}

let handleSubmit = async(e) => {
  e.preventDefault();  // To stop the loading of the page
  let response =await axios.post('http://localhost:3500/contacts', state.contact)
  if (response) {
    navigate("/", { replace: true });
  }
  else{
    console.error('error while loading')
  }
 
}


let {contact,groups} = state;

  return (
    <React.Fragment>
      <section className="create-contact">
        <div className=" container">
          <p className="text-success m-2 h3">Create contact</p>
          <p className=" mb-3 fst-italic">Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">

                <div class="form-group mb-2">
                  <input
                  name="name" value={contact.name} onChange = {updateInput} 
                    type="text" className="form-control" placeholder="Name" required = {true} />
                </div>
                <div class="form-group mb-2">
                  <input
                     name="photo" value={contact.photo} onChange = {updateInput}
                   type="text" className="form-control" placeholder="Image Url"  required = {true}/>
                </div>
                <div class="form-group mb-2">
                  <input 
                    name="email" value={contact.email} onChange = {updateInput}
                  type="text" className="form-control" placeholder="Email" required = {true} />
                </div>
                <div class="form-group mb-2">
                  <input  name="mobile" value={contact.mobile} onChange = {updateInput}
                  type="number" className="form-control" placeholder="Mobie" required = {true} />
                </div>
                <div class="form-group mb-2">
                  <input name="company" value={contact.company} onChange = {updateInput}
                   type="text" className="form-control" placeholder="Company" required = {true} />
                </div>
                <div class="form-group mb-2">
                  <input   name="title" value={contact.title} onChange = {updateInput} 
                  type="text" className="form-control" placeholder="Title" required = {true} />
                </div>
                <div class=" mb-2">
                  <select className=" form-control"  name="groupId" value={contact.groupId} onChange = {updateInput}>
                    <option>select a group</option>
                   {
                      groups.length > 0 && 
                      groups.map((group) => {
                        return (
                        <option key={group.id}>{group.name}</option>
                        )
                      })
                   }
                  </select>
                </div>
                <div class="mb-2">
                  <input type="submit" className=" btn btn-success mx-2" value='Create' />
                  <Link to={'/contacts/list'} className="btn btn-dark">Cancel</Link>


                </div>

              </div>
              



            </div>
          </form>
        </div>
      </section>








    </React.Fragment>
  )
}


export default AddContact;