import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import pixelmatch from 'pixelmatch'

const ImageComparison = () => {
  const webcamRef = useRef(null)
  const [screenshot, setScreenshot] = useState(null)
  const [cccdImage, setCccdImage] = useState(null)
  const [similarity, setSimilarity] = useState(null)

  // Hàm chụp ảnh từ webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    setScreenshot(imageSrc)
  }

  // Hàm xử lý khi tải ảnh CCCD
  const handleCccdImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setCccdImage(reader.result) // Lưu ảnh CCCD dưới dạng base64
    }
    reader.readAsDataURL(file)
  }

  // Hàm so sánh ảnh
  const handleCompare = () => {
    const img1 = new Image()
    const img2 = new Image()

    img1.src = screenshot
    img2.src = cccdImage

    Promise.all([
      new Promise((resolve) => (img1.onload = resolve)),
      new Promise((resolve) => (img2.onload = resolve)),
    ]).then(() => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Thiết lập kích thước canvas bằng với ảnh từ webcam
      canvas.width = img1.width
      canvas.height = img1.height

      // Vẽ ảnh thứ hai (CCCD) lên canvas với kích thước của ảnh đầu tiên
      ctx.drawImage(img2, 0, 0, img1.width, img1.height)
      const imgData2 = ctx.getImageData(0, 0, img1.width, img1.height)

      // Vẽ ảnh đầu tiên (từ webcam)
      ctx.clearRect(0, 0, img1.width, img1.height)
      ctx.drawImage(img1, 0, 0)
      const imgData1 = ctx.getImageData(0, 0, img1.width, img1.height)

      const diff = ctx.createImageData(img1.width, img1.height)
      const numDiffPixels = pixelmatch(imgData1.data, imgData2.data, diff.data, img1.width, img1.height, {
        threshold: 0.1,
      })

      // Tính độ tương đồng
      const similarity = (1 - numDiffPixels / (img1.width * img1.height)) * 100
      setSimilarity(similarity.toFixed(2))
    })
  }

  return (
    <div>
      <h1>So sánh ảnh chụp từ webcam với ảnh CCCD</h1>

      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 1920, // Đặt chiều rộng cao
            height: 1080, // Đặt chiều cao cao
            facingMode: 'user', // Sử dụng camera trước
          }}
        />
        <button onClick={capture}>Chụp ảnh</button>
      </div>

      {screenshot && (
        <div>
          <h3>Ảnh từ webcam:</h3>
          <img src={screenshot} alt="Screenshot" />
        </div>
      )}

      <div>
        <label>Chọn ảnh CCCD:</label>
        <input type="file" onChange={handleCccdImageChange} accept="image/*" />
      </div>

      {cccdImage && (
        <div>
          <h3>Ảnh CCCD:</h3>
          <img src={cccdImage} alt="CCCD" style={{ width: '200px' }} />
        </div>
      )}

      <button onClick={handleCompare}>So sánh ảnh</button>
      {similarity && <p>Độ tương đồng: {similarity}%</p>}
    </div>
  )
}

export default ImageComparison
