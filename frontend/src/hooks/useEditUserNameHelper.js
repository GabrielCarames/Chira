// import { useState, useContext } from 'react'
// import { useHistory } from "react-router-dom";
// import firebase from '../firebase'
// import axios from 'axios'
// import FlashContext from '../contexts/FlashContext'

// export function useEditUserNameHelper() {
//     const [ loading, setLoading ] = useState()
//     const [ active, setActive ] = useState()
//     const [ form, setForm ] = useState()
//     const { setFlashMessage } = useContext(FlashContext)
//     let history = useHistory()

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });
//     };

//     const editUserName = async (e, originalUserName) => {
//         //
//     }

//       return {
//           handleChange,
//           editUserName
//       }
// }

// export default useEditUserNameHelper