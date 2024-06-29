import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

const SavedVideos = props => {
  const {list} = props
  return (
    <>
      <Header />
      <div className="home-cart-container">
        <SideBar />
        <div className="no-saved-container">
          <img
            className="no-saved-videos"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <h1>No saved videos found</h1>
          <p>You can save your videos while watching them</p>
        </div>
      </div>
    </>
  )
}

export default SavedVideos
