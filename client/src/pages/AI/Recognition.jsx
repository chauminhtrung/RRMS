import { useState } from 'react'
import axios from 'axios'
import { env } from '~/configs/environment'

const Recognition = () => {
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const handleUpload = async () => {
    if (!image) {
      alert('Vui lòng chọn ảnh trước!')
      return
    }

    const formData = new FormData()
    formData.append('image', image)

    try {
      const response = await axios.post('https://api.fpt.ai/vision/idr/vnm', formData, {
        headers: {
          'api-key': env.FPT_AI_KEY,
        },
      })

      if (response.data && response.data.data) {
        setResult(response.data.data)
      } else {
        setResult('Không có kết quả nào được trả về.')
      }
    } catch (error) {
      console.error('Lỗi:', error)
      alert('Có lỗi xảy ra khi gọi API!')
    }
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Nhận diện Căn cước công dân</h1>

      <input type="file" accept="image/jpeg, image/png, image/jpg, image/gif" onChange={handleImageChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
        Nhận diện
      </button>

      {image && (
        <div>
          <h2>Ảnh đã chọn:</h2>
          <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '300px', maxHeight: '400px' }} />
        </div>
      )}

      {result && (
        <div>
          <h2>Kết quả nhận diện:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default Recognition
