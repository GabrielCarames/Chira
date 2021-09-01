import { useContext } from 'react'
import axios from 'axios'
import _ from 'lodash';
import FlashContext from '../contexts/FlashContext'

export function useAddFriendsHelper() {
    const { setFlashMessage } = useContext(FlashContext)
    
    const onSearchSubmit = _.memoize(async term => {
        console.log('New Search submit:', term);
        try {
            const res = await axios.post('http://localhost:3001/users/friendsearch', {term})
            return res.data
        } catch (error) {
            if(error.response) setFlashMessage({type: 'failure', error: error.response.data})
            else setFlashMessage({type: 'failure', error: error})
        }
      });

      return {
        onSearchSubmit
      }
}

export default useAddFriendsHelper