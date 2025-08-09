import React, { useState, useEffect } from 'react'
import { ArrowUpCircleFill } from 'react-bootstrap-icons'
import './ScrollToTopButton.scss'

const ScrollToTopButton = () => {
  // State để kiểm soát việc nút có hiển thị hay không
  const [isVisible, setIsVisible] = useState(false)

  // Hàm để kiểm tra vị trí cuộn của trang
  const toggleVisibility = () => {
    // Nếu cuộn xuống hơn 300px, hiển thị nút
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Hàm để cuộn lên đầu trang một cách mượt mà
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Đây là chìa khóa cho hiệu ứng cuộn mượt
    })
  }

  useEffect(() => {
    // Thêm một event listener để theo dõi sự kiện cuộn trang
    window.addEventListener('scroll', toggleVisibility)

    // Dọn dẹp event listener khi component bị unmount
    // Điều này rất quan trọng để tránh rò rỉ bộ nhớ
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className='scroll-to-top'>
      {isVisible && (
        <button onClick={scrollToTop} className='scroll-button'>
          <ArrowUpCircleFill size={30} />
        </button>
      )}
    </div>
  )
}

export default ScrollToTopButton
