import React from 'react'

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <form>
    <div>
      Filter shown with:
        <input value={searchTerm} onChange={handleSearch} />
    </div>
    </form>
  )
}

export default Filter