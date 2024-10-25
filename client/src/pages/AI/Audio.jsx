import { useState, useEffect, useRef } from 'react'
import MicIcon from '@mui/icons-material/Mic'
import IconButton from '@mui/material/IconButton'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'

const AudioRecorder = ({ setRecordedText, open, handleClose, setIsRecording, isRecording }) => {
  const [transcript, setTranscript] = useState('')
  const [volume, setVolume] = useState(1)
  const recognitionRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const startSound = new Audio(
    'https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/audios%2F519986__abdrtar__recording-end.mp3?alt=media&token=63703c07-fd30-4707-8093-063b2d6954b1'
  )
  const endSound = new Audio(
    'https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/audios%2F519986__abdrtar__recording-end.mp3?alt=media&token=63703c07-fd30-4707-8093-063b2d6954b1'
  )
  // const silenceTimeoutRef = useRef(null)

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
          setTimeout(() => {
            handleClose()
          }, 1500)
        } else {
          // eslint-disable-next-line no-unused-vars
          interimTranscript += transcriptSegment
        }
      }
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
      stopAudioProcessing()
    }
  }, [setRecordedText])

  // Hàm xử lý âm thanh từ micro
  const startAudioProcessing = async () => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true })
    const source = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current)

    analyserRef.current = audioContextRef.current.createAnalyser()
    analyserRef.current.fftSize = 256

    source.connect(analyserRef.current)
    analyseVolume()
  }

  // Dừng phân tích âm thanh
  const stopAudioProcessing = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
    setVolume(1) // Đặt lại volume về 1 khi dừng ghi âm
    // clearTimeout(silenceTimeoutRef.current)
  }

  // Phân tích âm lượng
  const analyseVolume = () => {
    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const getVolume = () => {
      analyserRef.current.getByteFrequencyData(dataArray)
      let sum = 0
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i]
      }
      const avgVolume = sum / bufferLength
      setVolume(avgVolume / 128) // Chuẩn hóa âm lượng để lấy giá trị trong khoảng 0-1
      requestAnimationFrame(getVolume)
      // if (avgVolume > 10) {
      //   resetSilenceTimer() // Đặt lại timer nếu có âm thanh
      // }

      // requestAnimationFrame(getVolume)
    }

    getVolume() // Bắt đầu quá trình phân tích âm lượng
  }

  // Hàm đặt lại bộ đếm thời gian
  // const resetSilenceTimer = () => {
  //   clearTimeout(silenceTimeoutRef.current)
  //   silenceTimeoutRef.current = setTimeout(() => {
  //     handleStop() // Dừng ghi âm sau 10s im lặng
  //   }, 10000) // 10 giây
  // }

  const handleStart = () => {
    setTranscript('')
    recognitionRef.current.start()
    startAudioProcessing()
    startSound.play()
    setIsRecording(true)
    if (transcript == '') {
      setTimeout(() => {
        handleStop()
      }, 5000)
    }
    // resetSilenceTimer()
  }

  const handleStop = () => {
    recognitionRef.current.stop()
    stopAudioProcessing()
    endSound.play()
    setIsRecording(false)
  }

  const handleStartStop = () => {
    isRecording ? handleStop() : handleStart()
  }

  const micButtonStyle = {
    position: 'relative',
    backgroundColor: isRecording ? '#e55039' : '#f5f5f5',
    borderRadius: '50%',
    padding: '40px',
    transition: 'background-color 0.3s ease, transform 0.1s ease',
    transform: `scale(${0.5 + volume * 0.5})`, // Phóng to dựa trên âm lượng
    color: isRecording ? 'white' : 'black',
  }

  const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    height: 420,
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
              {isRecording ? 'Đang nghe...' : 'Micro đang tắt. Nhấn vào mic để nói'}
            </Typography>

            <Typography sx={{ mt: 3 }}>{transcript || '...Không có dữ liệu'}</Typography>

            <IconButton onClick={handleStartStop} style={micButtonStyle} sx={{ mt: 5 }}>
              <MicIcon style={{ fontSize: '120px', mt: 4 }} />
            </IconButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default AudioRecorder
