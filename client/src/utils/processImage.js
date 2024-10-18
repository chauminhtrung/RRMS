import imageCompression from 'browser-image-compression'
import { resizeAndCrop } from './resizeImage'
export const processImage = async (image, aspectRatio, maxSizeMB) => {
  try {
    const croppedImage = await resizeAndCrop(image, aspectRatio)

    const options = {
      maxSizeMB: maxSizeMB,
      useWebWorker: true,
    }
    const compressedImage = await imageCompression(croppedImage, options)
    console.log(compressedImage.type)

    return compressedImage
  } catch (error) {
    console.error('Có lỗi xảy ra trong quá trình xử lý ảnh:', error)
    throw error
  }
}
