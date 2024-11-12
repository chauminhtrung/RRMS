import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

import { storage } from '~/configs/firebaseConfig'
import { uploadImage } from '~/apis/uploadImageAPI'

const ImageUpload = () => {
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')
  const [progress, setProgress] = useState(0)
  const imageName = v4()

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${imageName}`) //thư mục chưa ảnh
      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setProgress(progress)
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUrl(url)
            // Gửi URL của ảnh đến backend (Spring Boot)
            uploadImage(imageName, url)
          })
        }
      )
    }
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <progress value={progress} max="100" />
      <br />
      {url && <img src={url} alt="Uploaded" />}
    </div>
  )
}

export default ImageUpload
