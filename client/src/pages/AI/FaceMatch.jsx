import { useState } from 'react'
import axios from 'axios'

const FaceMatch = () => {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [result, setResult] = useState(null)

  // Hàm xử lý khi chọn ảnh đầu tiên
  const handleImageChange1 = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage1(file) // Lưu ảnh vào state
    }
  }

  // Hàm xử lý khi chọn ảnh thứ hai
  const handleImageChange2 = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage2(file) // Lưu ảnh vào state
    }
  }

  // Hàm gửi ảnh lên FPT.AI để nhận diện
  const handleUpload = async () => {
    if (!image1 || !image2) {
      alert('Vui lòng chọn cả hai ảnh để so khớp!')
      return
    }

    const formData = new FormData()
    formData.append('file[]', image1) // Gửi ảnh đầu tiên
    formData.append('file[]', image2) // Gửi ảnh thứ hai

    try {
      const response = await axios.post('https://api.fpt.ai/dmp/checkface/v1', formData, {
        headers: {
          'api-key': 'xTtzg5z0B00SFvfwRcmlnZkDgnnw4Vda', // Thay bằng API Key của bạn
          // Không cần thiết phải chỉ định Content-Type, axios sẽ tự động làm điều đó
        },
      })

      // Kiểm tra và xử lý phản hồi từ API
      if (response.data) {
        setResult(response.data)
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
      <h1>So khớp khuôn mặt</h1>

      <div style={{ marginBottom: '20px' }}>
        <input type="file" accept="image/jpeg, image/png, image/jpg, image/gif" onChange={handleImageChange1} />
        <span style={{ marginLeft: '10px' }}>Ảnh 1</span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input type="file" accept="image/jpeg, image/png, image/jpg, image/gif" onChange={handleImageChange2} />
        <span style={{ marginLeft: '10px' }}>Ảnh 2</span>
      </div>

      <button onClick={handleUpload} style={{ marginTop: '10px' }}>
        So khớp
      </button>

      {/* Hiển thị ảnh đã chọn */}
      <div style={{ marginTop: '20px' }}>
        {image1 && (
          <div>
            <h2>Ảnh 1 đã chọn:</h2>
            <img
              src={URL.createObjectURL(image1)}
              alt="Preview 1"
              style={{ maxWidth: '150px', maxHeight: '200px', margin: '10px' }}
            />
          </div>
        )}
        {image2 && (
          <div>
            <h2>Ảnh 2 đã chọn:</h2>
            <img
              src={URL.createObjectURL(image2)}
              alt="Preview 2"
              style={{ maxWidth: '150px', maxHeight: '200px', margin: '10px' }}
            />
          </div>
        )}
      </div>

      {result && (
        <div>
          <h2>Kết quả so khớp:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default FaceMatch
