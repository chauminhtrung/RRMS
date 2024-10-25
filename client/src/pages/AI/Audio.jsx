import { useState, useEffect, useRef } from 'react'
import MicIcon from '@mui/icons-material/Mic'
import IconButton from '@mui/material/IconButton'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'

const AudioRecorder = ({ setRecordedText, open, handleClose, setIsRecording, isRecording }) => {
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    //Đoạn mã sử dụng SpeechRecognition để xử lý việc ghi âm và chuyển đổi giọng nói thành văn bản.
    //Đây là một API tích hợp sẵn trong trình duyệt, không phải là API bên ngoài.
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn không hỗ trợ Web Speech API!')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'vi-VN'
    recognition.continuous = true
    recognition.interimResults = true
    //đoạn mã lấy kết quả từ SpeechRecognition và cập nhật transcript.
    // Tuy nhiên, không có bất kỳ gọi nào đến một API bên ngoài để lưu hoặc xử lý dữ liệu này.
    recognition.onresult = (event) => {
      let interimTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          const finalTranscript = transcriptSegment + ' '
          setTranscript((prev) => prev + finalTranscript)
          setRecordedText((prev) => prev + finalTranscript)
          setRecordedText(finalTranscript)
        } else {
          // eslint-disable-next-line no-unused-vars
          interimTranscript += transcriptSegment
        }
      }
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [setRecordedText])

  const handleStart = () => {
    setTranscript('')
    recognitionRef.current.start()
    setIsRecording(true)
  }

  const handleStop = () => {
    recognitionRef.current.stop()
    setIsRecording(false)
  }

  const handleStartStop = () => {
    isRecording ? handleStop() : handleStart()
  }

  const micButtonStyle = {
    backgroundColor: isRecording ? 'red' : '#f5f5f5',
    borderRadius: '50%',
    padding: '20px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    transform: isRecording ? 'scale(1.2)' : 'scale(1)',
    color: isRecording ? 'white' : 'black',
  }

  const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 380,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    p: 4,
    textAlign: 'center',
    padding: 5,
  }
  const modalBackdropStyle = {
    backdropFilter: 'blur(5px)', // Nền mờ
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Hiệu ứng overlay
  }
  return (
    <div>
      {/* Modal với nền mờ và hiệu ứng chuyển động */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: modalBackdropStyle,
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Fade in={open}>
          <Box sx={modalBoxStyle}>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
              {isRecording ? 'Đang nghe...' : 'Nhấn vào mic để bắt đầu ghi âm'}
            </Typography>

            <Typography sx={{ mt: 3 }}>{transcript || '...Không có dữ liệu'}</Typography>

            <IconButton onClick={handleStartStop} style={micButtonStyle} sx={{ mt: 3 }}>
              <MicIcon style={{ fontSize: '80px', mt: 4 }} />
            </IconButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default AudioRecorder
