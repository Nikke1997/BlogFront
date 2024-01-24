import React from 'react'


const LogOut = () => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  return (
    <div className="logout">
      <button onClick={handleLogout}>
        Log Out
      </button>
    </div>
  )
}

export default LogOut