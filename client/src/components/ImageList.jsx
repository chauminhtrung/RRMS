import { useEffect, useState } from 'react'
import { getImages } from '~/apis/uploadImageAPI'

const ImageList = () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    getImages().then((response) => {
      setImages(response.data)
    })
  }, [])

  return (
    <div>
      {images.map((image) => (
        <img height={100} key={image.id} src={image.url} alt={image.name} />
      ))}
    </div>
  )
}

export default ImageList
