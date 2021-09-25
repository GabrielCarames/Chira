import ImageUploading from "react-images-uploading";

const UploadImage = ({images, setImages, setDisplayPreviousImage}) => {
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setDisplayPreviousImage(true)
    };

    return (
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
        {
            ({ onImageUpload }) => (
                <div className="upload__image-wrapper">
                    <div className="main__upload-image-container" onClick={onImageUpload}>
                        <i className="fas fa-paperclip"></i>
                    </div>
                </div>
            )
        }
        </ImageUploading>
    )
}

export default UploadImage