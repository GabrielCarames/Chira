import avatar from '../images/avatar.png'

const CreateGroup = () => {

    return (
        <div className="main__create-group-section create-group">
            <div className="create-group__navbar">
                <div className="create-group__upload-image-container">
                    <label for="create-group__image-input" className="create-group__image-label">
                        <img className="create-group__image" src={avatar} alt="" />
                        <i className="fas fa-camera"></i>
                    </label>
                    <input type="file" name="file" accept="image/png, image/gif, image/jpeg" id="create-group__image-input" className="create-group__image-input" /**onChange={(e) => verifyImage(e)}**/ />
                </div>
                <div className="create-group__group-name-container">
                    <div className="create-group__group-name-form form">
                        <label className="form__label" htmlFor="groupName">Nombre del grupo</label>
                        <input className="form__input" id="groupName" type="text" name="groupName" /*onChange={handleChange}*/  minLength="0" maxLength="18" pattern="[A-Za-z0-9]+"/>
                    </div>
                    {/* <button className="form__button" type="submit" /*className={active ? "form__button active" : loading ? "form__button loading" : "form__button"}>
                        <p className="form__text-button">enviar esto va? wtf</p>
                    </button> */}
                </div>
            </div>
            <div className="create-group__contacts-container">
                <ul className="create-group__contact-list list">
                    <li className="list__item">

                    </li>

                </ul>
            </div>
        </div>
    )
}

export default CreateGroup