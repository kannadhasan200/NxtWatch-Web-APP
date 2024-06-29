import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const Videos = props => {
  const {video} = props
  const {title, publishedAt, channel, viewCount, id, thumbnailUrl} = video
  const {name, profileImageUrl} = channel
  const getDuration = time => {
    const date = new Date(time)
    const value = `${date.getFullYear()},${
      date.getMonth() + 1
    },${date.getDate()}`

    return formatDistanceToNow(new Date(value))
  }

  return (
    <li className="video-list-container">
      <Link className="video-link" to={`/videos/${id}`}>
        <img
          className="video-thumbnail"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <div className="channel-title-container">
          <img
            className="channel-profile-logo"
            src={profileImageUrl}
            alt="channel logo"
          />
          <div>
            <p className="video-title">{title}</p>
            <p className="channel">{name}</p>
            <p className="view-count">
              {viewCount} . {getDuration(publishedAt)} ago
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default Videos
