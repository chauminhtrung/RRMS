import { useEffect } from 'react'

function ChatAI() {
  useEffect(() => {
    // Cấu hình URL của Live Chat
    const liveChatBaseUrl = `${document.location.protocol}//livechat.fpt.ai/v36/src`
    const LiveChatSocketUrl = 'livechat.fpt.ai:443'
    let FptAppCode = '1a40e2d67746d857acee70edb4d7c9b7'
    const FptAppName = 'rrms3'

    // Cấu hình style cho bot
    const CustomStyles = {
      headerBackground: 'linear-gradient(86.7deg, #3353a2ff 0.85%, #31b7b7ff 98.94%)',
      headerLogoLink: 'https://your-logo-url.com/logo.png',
      headerTextColor: '#ffffffff',
      headerLogoEnable: false,
      headerText: 'Hệ thống hỗ trợ nhà trọ RRMS',
      avatarBot: './avatarbot.png',
      sendMessagePlaceholder: 'Nhập tin nhắn...',
      floatButtonLogo: './avatarbot.png', // Thay bằng URL logo mới
      floatButtonTooltip: 'Hỗ trợ trực tuyến nhà trọ RRMS',
      customerWelcomeText: 'Vui lòng nhập tên của bạn',
      customerButtonText: 'Bắt đầu',
      prefixEnable: false,
      prefixOptions: ['Anh', 'Chị'],
      floatButtonTooltipEnable: true,
      prefixPlaceholder: 'Danh xưng',
    }

    const FptLiveChatConfigs = {
      appName: FptAppName,
      appCode: FptAppCode,
      themes: '',
      styles: CustomStyles,
    }

    // Thêm script vào DOM
    const script = document.createElement('script')
    script.src = `${liveChatBaseUrl}/static/fptai-livechat.js`
    script.async = true
    script.onload = () => {
      window.fpt_ai_render_chatbox(FptLiveChatConfigs, liveChatBaseUrl, LiveChatSocketUrl)
    }
    document.body.appendChild(script)

    // Thêm stylesheet vào DOM
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `${liveChatBaseUrl}/static/fptai-livechat.css`
    document.body.appendChild(link)

    // Cleanup khi component bị unmount
    return () => {
      document.body.removeChild(script)
      document.body.removeChild(link)
    }
  }, [])

  return <div></div>
}

export default ChatAI
