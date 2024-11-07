import { useState } from 'react'
import axios from 'axios'
import { env } from '~/configs/environment'

const PassportRecognition = () => {
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleRecognition = async () => {
    if (!image) {
      alert('Vui lòng chọn một ảnh!')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('image', image)

    try {
      const response = await axios.post('https://api.fpt.ai/vision/passport/vnm', formData, {
        headers: {
          'api-key': env.FPT_AI_KEY
        }
      })

      console.log(response.data) // Kiểm tra cấu trúc dữ liệu từ API
      setResult(response.data.data[0]) // Lấy phần tử đầu tiên từ mảng
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.data)
        alert('Lỗi từ API: ' + (error.response.data.message || 'Lỗi không xác định'))
      } else if (error.request) {
        console.error('Request error:', error.request)
        alert('Không thể kết nối đến máy chủ')
      } else {
        console.error('Error', error.message)
        alert('Đã xảy ra lỗi không xác định')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Nhận diện Hộ chiếu</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleRecognition} disabled={loading}>
        {loading ? 'Đang nhận diện...' : 'Nhận diện'}
      </button>

      {result && (
        <div>
          <h3>Thông tin Hộ chiếu:</h3>
          <ul>
            <li>
              <strong>Mã quốc gia:</strong> {result.country_code} ({result.country_code_prob}%)
            </li>
            <li>
              <strong>Ngày sinh:</strong> {result.dob} ({result.dob_prob}%)
            </li>
            <li>
              <strong>Ngày hết hạn:</strong> {result.doe} ({result.doe_prob}%)
            </li>
            <li>
              <strong>Ngày cấp:</strong> {result.doi} ({result.doi_prob}%)
            </li>
            <li>
              <strong>Số hộ chiếu:</strong> {result.id_number} ({result.id_number_prob}%)
            </li>
            <li>
              <strong>MRZ dòng 1:</strong> {result.mrz_1} ({result.mrz_1_prob}%)
            </li>
            <li>
              <strong>MRZ dòng 2:</strong> {result.mrz_2} ({result.mrz_2_prob}%)
            </li>
            <li>
              <strong>Họ tên:</strong> {result.name} ({result.name_prob}%)
            </li>
            <li>
              <strong>Quốc tịch:</strong> {result.nationality} ({result.nationality_prob}%)
            </li>
            <li>
              <strong>Điểm nhận diện tổng quát:</strong> {result.overall_score}
            </li>
            <li>
              <strong>Loại hộ chiếu:</strong> {result.passport_class} ({result.passport_class_prob}%)
            </li>
            <li>
              <strong>Số hộ chiếu:</strong> {result.passport_number} ({result.passport_number_prob}%)
            </li>
            <li>
              <strong>Nơi sinh:</strong> {result.pob} ({result.pob_prob}%)
            </li>
            <li>
              <strong>Nơi cấp:</strong> {result.poi} ({result.poi_prob}%)
            </li>
            <li>
              <strong>Giới tính:</strong> {result.sex} ({result.sex_prob}%)
            </li>
            <li>
              <strong>Loại tài liệu:</strong> {result.type}
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default PassportRecognition
