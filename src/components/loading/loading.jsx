import React, { useState, useEffect } from 'react' // Thêm useState và useEffect
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import './loading.scss'

const Loading = ({ isLoading }) => {
  // 1. Tạo state để lưu trữ giá trị phần trăm, bắt đầu từ 0
  const [percentage, setPercentage] = useState(0)

  // 2. Dùng useEffect để kích hoạt animation khi component được hiển thị
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setPercentage(100)
      }, 100)

      return () => clearTimeout(timer)
    } else {
      setPercentage(0)
    }
  }, [isLoading])

  if (!isLoading) {
    return null
  }

  return (
    <div className='reloading-overlay'>
      <div className='progressbar-container'>
        <CircularProgressbar
          value={percentage}
          color='danger'
          text={`Loading...`}
          styles={buildStyles({
            strokeLinecap: 'butt',
            textSize: '16px',
            pathTransitionDuration: 1,
            pathColor: '#ff8a00',
            textColor: '#333',
            trailColor: '#d6d6d6',
          })}
        />
      </div>
    </div>
  )
}

export default Loading
