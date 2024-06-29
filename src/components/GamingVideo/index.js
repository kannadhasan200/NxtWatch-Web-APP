import {Link} from 'react-router-dom'
import './index.css'

const GamingVideo = props => {
  const {video} = props
  const {id, title, thumbnailUrl, viewCount} = video
  return (
    <li>
      <Link className="gaming-link" to={`/videos/${id}`}>
        <img
          className="gaming-thumbnail"
          src={thumbnailUrl}
          alt="video thumbnail "
        />
        <p className="gaming-title">{title}</p>
        <p>{viewCount} Watching Worldwide</p>
      </Link>
    </li>
  )
}

export default GamingVideo
