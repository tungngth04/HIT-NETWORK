import React, { useMemo } from 'react'
import { ChevronRight } from 'react-bootstrap-icons'
import './SidebarWidget.scss'

const SidebarWidget = ({ title, items, type, viewMoreLink = '#' }) => {
  const filteredItems = useMemo(
    () => items.filter((items) => items.targetType === type).slice(0, 3),
    [items, type],
  )
  console.log('items', items)

  return (
    <div className='sidebar-widget'>
      <div className='widget-header'>
        <h3 className='widget-title'>{title}</h3>
        <a href={viewMoreLink} className='widget-view-more'>
          View More <ChevronRight size={12} />
        </a>
      </div>

      <ul className='widget-list'>
        {filteredItems.length > 0 ? (
          // Hiển thị danh sách đã được lọc
          filteredItems.map((item) => (
            <li key={item.id} className='widget-item'>
              <div className='item-date'>
                <span className='date-day'>{new Date(item.createdAt).getDate()}</span>
                <span className='date-month'>
                  {new Date(item.createdAt).toLocaleString('en-US', { month: 'short' })}
                </span>
              </div>
              <div className='item-info'>
                <span className='item-title'>{item.title}</span>
                <span className='item-details'>{item.creator.fullName}</span>
              </div>
            </li>
          ))
        ) : (
          <li className='widget-item-empty'>Không có bài đăng nào.</li>
        )}
      </ul>
    </div>
  )
}

export default SidebarWidget
