import React from 'react'
import { ChevronRight } from 'react-bootstrap-icons'

import './sidebarWidget.scss'

const SidebarWidget = ({ title, items }) => {
  return (
    <div className='sidebar-widget'>
      <h3 className='widget-title'>{title}</h3>
      <ul className='widget-list'>
        {items.map((item) => (
          <li key={item.id} className='widget-item'>
            <div className='item-date'>
              <span className='date-day'>{item.date.day}</span>
              <span className='date-month'>{item.date.month}</span>
            </div>
            <div className='item-info'>
              <span className='item-title'>{item.title}</span>
              <a href='#' className='item-details-link'>
                {item.subtitle}
              </a>
            </div>
          </li>
        ))}
      </ul>
      <a href='#' className='widget-view-more'>
        View More <ChevronRight size={12} />
      </a>
    </div>
  )
}

export default SidebarWidget
