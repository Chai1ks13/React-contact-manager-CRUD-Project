import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AddContact from "./components/contacts/AddContact/AddContact";
import ContactList from "./components/contacts/ContactList/ContactList";
import EditContact from "./components/contacts/EditContact/EditContact";
import ViewContact from "./components/contacts/ViewContact/ViewContact";
import NavBar from "./components/Navbar/Navbar";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
      
        <Route path="/" element={<Navigate to={"/contacts/list"} />} />
        <Route path="/contacts/list" element={<ContactList />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        <Route path="/contacts/view/:contactId" element={<ViewContact />} />
      </Routes>
    </div>
  );
}

export default App;
