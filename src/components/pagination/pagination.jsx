import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'
import './Pagination.scss'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className='pagination-container'>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className='pagination-button'>
        Top
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='pagination-arrow'>
        <ChevronLeft />
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`pagination-dot ${currentPage === pageNumber ? 'active' : ''}`}
          />
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='pagination-arrow'>
        <ChevronRight />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className='pagination-button'>
        Last
      </button>
    </nav>
  )
}

export default Pagination
