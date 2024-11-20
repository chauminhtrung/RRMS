import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { env } from '~/configs/environment'

function ChatAI() {
  useEffect(() => {
    const liveChatBaseUrl = `${document.location.protocol}//livechat.fpt.ai/v36/src`
    const LiveChatSocketUrl = 'livechat.fpt.ai:443'
    const FptAppCode = env.FPT_APP_CODE
    const FptAppName = 'rrms3'

    const CustomStyles = {
      headerBackground: 'linear-gradient(86.7deg, #3353a2ff 0.85%, #31b7b7ff 98.94%)',
      headerLogoLink: 'https://your-logo-url.com/logo.png',
      headerTextColor: '#fff',
      headerLogoEnable: false,
      headerText: 'Hệ thống hỗ trợ nhà trọ RRMS',
      avatarBot:
        'https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fpty-chatbot-white-new.png?alt=media&token=ba6209c0-3ff3-4bdd-835e-677275d8b37e',
      sendMessagePlaceholder: 'Nhập tin nhắn...',
      floatButtonLogo:
        'https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fpty-chatbot-white-new.png?alt=media&token=ba6209c0-3ff3-4bdd-835e-677275d8b37e',
      floatButtonTooltip: 'Hỗ trợ trực tuyến nhà trọ RRMS',
      customerWelcomeText: 'Vui lòng nhập tên của bạn',
      customerButtonText: 'Bắt đầu',
      prefixEnable: false,
      prefixOptions: ['Anh', 'Chị'],
      floatButtonTooltipEnable: true,
      prefixPlaceholder: 'Danh xưng'
    }

    const FptLiveChatConfigs = {
      appName: FptAppName,
      appCode: FptAppCode,
      themes: '',
      styles: CustomStyles
    }

    const initializeChat = () => {
      window.fpt_ai_render_chatbox(FptLiveChatConfigs, liveChatBaseUrl, LiveChatSocketUrl)
      window.fpt_ai_chatbox_rendered = true
      adjustLiveChatButtonMargin();
    }

    const adjustLiveChatButtonMargin = () => {
      const button = document.getElementById('fpt_ai_livechat_button');
      const div = document.getElementById('fpt_ai_livechat_button_tooltip');

      if (button) {
        if (window.innerWidth <= 800) {
          div.style.setProperty('bottom', '80px', 'important');
          button.style.setProperty('bottom', '80px', 'important');

          console.log('Lề đã được điều chỉnh cho màn hình nhỏ.');
        }
      }
    };

    // Kiểm tra nếu script đã tồn tại và chỉ thêm nếu cần thiết
    if (!window.fpt_ai_chatbox_rendered) {
      const existingScript = document.querySelector('script[src*="fptai-livechat.js"]')
      if (!existingScript) {
        const script = document.createElement('script')
        script.src = `${liveChatBaseUrl}/static/fptai-livechat.js`
        script.async = true
        script.onload = initializeChat
        document.body.appendChild(script)
      } else {
        initializeChat()
      }

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `${liveChatBaseUrl}/static/fptai-livechat.css`
      document.body.appendChild(link)


      // Initial adjustment
      adjustLiveChatButtonMargin();

      // Adjust on window resize
      window.addEventListener('resize', adjustLiveChatButtonMargin);

      return () => {
        window.removeEventListener('resize', adjustLiveChatButtonMargin);
        if (window.fpt_ai_chatbox_rendered) {
          const chatContainer = document.getElementById('fpt-chat-container')
          if (chatContainer) chatContainer.innerHTML = '' // Dọn dẹp nội dung chat
          window.fpt_ai_chatbox_rendered = false
        }
      }
    }
  }, [])

  return createPortal(<div id="fpt-chat-container"></div>, document.body)
}

export default ChatAI
