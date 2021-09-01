import { useState } from 'react'
import axios from 'axios'

export function useAddFriendsHelper() {
    const [ active, setActive ] = useState()
    const [ form, setForm ] = useState()
    const [quotes, setQuotes] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const onSearchSubmit = async term => {
        console.log('New Search submit:', term);
        try {
            const res = await axios.post('http://localhost:3001/users/friendsearch', {term})
            return res.data
        } catch (error) {
            console.log("ups", error)
            // if(error.response) setFlashMessage({type: 'failure', error: error.response.data})
            // else setFlashMessage({type: 'failure', error: error})
        }
      };

    

    const clearResults = () => setQuotes([]);

      return {
        onSearchSubmit,
        clearResults
      }
}

export default useAddFriendsHelper