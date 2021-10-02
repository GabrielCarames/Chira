const UploadImage = ({images, setImages, setDisplayPreviousImage}) => {
    
    const verifyImage = (e) => {
        const imageData = e.target.files[0]
        console.log("soy", imageData, "rarotravez", URL.createObjectURL(imageData))
        setImages([URL.createObjectURL(imageData), imageData]);
        setDisplayPreviousImage(true)
    };

    return (
        <div className="main__input-image-section">
            <label for="main__image-input" className="main__image-label">
                <i className="fas fa-paperclip"></i>
            </label>
            <input type="file" name="file" accept="image/png, image/gif, image/jpeg" id="main__image-input" className="main__image-input" onChange={(e) => verifyImage(e)}/>
        </div>
    )
}

export default UploadImage