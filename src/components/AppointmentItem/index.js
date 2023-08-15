// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentItem, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentItem

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarItem = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="list-item">
      <div>
        <p className="head1">{title}</p>
        <p className="para1">Date: {date}</p>
      </div>
      <button
        data-testid="star"
        type="button"
        onClick={onClickStarItem}
        className="btn2"
      >
        <img src={imgUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
