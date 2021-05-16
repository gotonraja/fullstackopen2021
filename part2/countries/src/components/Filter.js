import React from 'react'

const Filter = ({ text, searchTerm, handleSearch }) => {
  return (
    <form>
      <div>
        {text}
        <input
        type="text"
        value={searchTerm}
        onChange={handleSearch} required />
      </div>
    </form>
  )
}

export default Filter