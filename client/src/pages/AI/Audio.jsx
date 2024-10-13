import { useState } from 'react'
import { ReactMic } from 'react-mic' // Thư viện thu âm
import axios from 'axios'

const Audio = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [resultText, setResultText] = useState('')

  // Bắt đầu hoặc dừng ghi âm
  const handleStartStop = () => {
    setIsRecording((prev) => !prev)
  }

  // Xử lý dữ liệu audio sau khi dừng ghi âm
  const onStop = (recordedBlob) => {
    console.log('Recorded Blob:', recordedBlob)
    setAudioBlob(recordedBlob.blob)
  }

  // Gửi audio lên FPT.AI để chuyển đổi thành văn bản
  const handleUpload = async () => {
    if (!audioBlob) {
      alert('Vui lòng ghi âm trước!')
      return
    }

    const formData = new FormData()
    formData.append('file', audioBlob)

    try {
      const response = await axios.post('https://api.fpt.ai/hmi/asr/general', formData, {
        headers: {
          'api-key': 'https://api.fpt.ai/nlp', // Thay bằng API Key của bạn
          'Content-Type': 'multipart/form-data',
        },
      })

      setResultText(response.data.hypotheses[0].utterance) // Hiển thị kết quả
    } catch (error) {
      console.error('Lỗi:', error)
      alert('Có lỗi xảy ra khi gọi API!')
    }
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Thu âm và chuyển đổi giọng nói với FPT.AI</h1>

      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={handleStartStop}>{isRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}</button>

      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
        Chuyển Đổi
      </button>

      <div>
        <h2>Kết quả:</h2>
        <p>{resultText}</p>
      </div>
    </div>
  )
}

export default Audio
