import { usePreviousImageDispatch, usePreviousImageStore } from "../store/PreviousImageProvider";
import { previousImageTypes } from "../store/previousImageReducer";

const UploadImage = ({images, setImages, setDisplayPreviousImage}) => {
    
    const { previousImage } = usePreviousImageStore()
    const previousImageDispatch = usePreviousImageDispatch()

    const verifyImage = (e) => {
        const imageData = e.target.files[0]
        setImages([URL.createObjectURL(imageData), imageData]);
        // setDisplayPreviousImage(true)
        previousImageDispatch({
            type: previousImageTypes.display
        })
    };

    return (
        <div className="main__input-image-section">
            <label htmlFor="main__image-input" className="main__image-label">
                <i className="fas fa-paperclip"></i>
            </label>
            <input type="file" name="file" accept="image/png, image/gif, image/jpeg" id="main__image-input" className="main__image-input" onChange={(e) => verifyImage(e)}/>
        </div>
    )
}

export default UploadImage