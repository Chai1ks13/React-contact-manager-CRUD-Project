import axios from "axios"


export default  class ContactService {
    static serverURL = 'http://localhost:3500'
    

    static getAllConatcts = () => {
        let dataURL = `${this.serverURL}/contacts`
        return axios.get(dataURL)
    }

    static getContact = (contactId) => {

        let dataURL = `${this.serverURL}/contacts/${contactId}`
        return axios.get(dataURL);
    }
}

 