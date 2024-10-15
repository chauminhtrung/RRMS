export const resizeAndCrop = (file, aspectRatio) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (event) => {
      img.src = event.target.result
    }

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      let width = img.width
      let height = img.height

      if (width / height > aspectRatio) {
        width = height * aspectRatio
      } else {
        height = width / aspectRatio
      }

      canvas.width = width
      canvas.height = height

      const offsetX = (img.width - width) / 2
      const offsetY = (img.height - height) / 2

      ctx.drawImage(img, offsetX, offsetY, width, height, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          resolve(blob)
        },
        'image/webp',
        1
      )
    }

    img.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}
