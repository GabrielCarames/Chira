import { useCreateGroupHelper } from '../hooks/useCreateGroupHelper'

const CreateGroup = ({ groupContacts, setDisplayCreateGroup}) => {
    const { groupImage, setGroupImage, handleChange, createGroup, displayAvatar } = useCreateGroupHelper(setDisplayCreateGroup);
    
    return (
        <div className="main__create-group-section create-group">
            <div className="create-group__navbar-container">
                <div className="create-group-navbar">
                    <div className="create-group-section" onClick={() => setDisplayCreateGroup(false)}>
                        <i className="fas fa-times" aria-hidden="true"></i>
                    </div>
                    <h3 className="create-group__title">Crear grupo</h3>
                </div>
                <div className="create-group__upload-image-container">
                    <label htmlFor="create-group__image-input" className="create-group__image-label">
                        <img className="create-group__image" src={groupImage.temporalyImage ? groupImage.temporalyImage: groupImage} alt="" />
                        <i className="fas fa-camera"></i>
                    </label>
                    <input type="file" name="file" accept="image/png, image/gif, image/jpeg" id="create-group__image-input" className="create-group__image-input" onChange={(e) => setGroupImage({temporalyImage: URL.createObjectURL(e.target.files[0]), imageToUpload: e.target.files[0]})} />
                </div>
                <div className="create-group__group-name-container">
                    <form className="create-group__group-name-form form" id="create-group__group-name-form" onSubmit={(e) => createGroup(e, groupContacts)}>
                        <label className="form__label" htmlFor="groupName">Nombre del grupo</label>
                        <input className="form__input" id="groupName" type="text" name="groupName" onChange={handleChange}  minLength="0" maxLength="18" pattern="[A-Za-z0-9]+"/>
                    </form>
                </div>
            </div>
            <div className="create-group__contacts-container">
                <ul className="create-group__contact-list list">
                    { 
                        groupContacts.map(contact => {
                            return (
                                <li className="list__item" key={contact._id}>   
                                    <img className="list__avatar" src={displayAvatar(contact)} alt="user-avatar" />
                                    <div className="list__info">
                                        <p className="list__username">{contact.username}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="create-group__form-button form">
                <button className="form__button" type="submit" form="create-group__group-name-form" >
                    <p className="form__text-button">Crear grupo</p>
                </button>
            </div>
        </div>
    )
}

export default CreateGroup