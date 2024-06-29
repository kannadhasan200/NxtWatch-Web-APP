import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const TrendingVideo = props => {
  const {video} = props
  const {title, publishedAt, channel, viewCount, id, thumbnailUrl} = video
  const {name} = channel
  const getDuration = time => {
    const date = new Date(time)
    const value = `${date.getFullYear()},${
      date.getMonth() + 1
    },${date.getDate()}`

    return formatDistanceToNow(new Date(value))
  }
  return (
    <li>
      <Link className="trending-link" to={`/videos/${id}`}>
        <img
          className="trending-thumbnail"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <div>
          <p>{title}</p>
          <p>{name}</p>
          <p>
            {viewCount} views . {getDuration(publishedAt)}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default TrendingVideo
