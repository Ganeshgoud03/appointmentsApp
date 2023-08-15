// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const initialAppointmentsList = []
class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentsList,
    titleInput: '',
    dateInput: '',
    forStarred: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  starredAppointmentList = () => {
    this.setState(prevState => ({forStarred: !prevState.forStarred}))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const addAppointment = {
      id: v4(),
      title: titleInput,
      date: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, addAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {appointmentsList, titleInput, dateInput, forStarred} = this.state

    let filteredList = appointmentsList
    if (forStarred === true) {
      filteredList = appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return (
      <div className="bg-container">
        <div className="container">
          <div className="top-container">
            <h1 className="heading">Add Appointment</h1>
            <div className="card-container">
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <label htmlFor="title" className="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                  placeholder="Title"
                />
                <label htmlFor="date" className="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="btn">
                  Add
                </button>
              </form>
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  className="img"
                  alt="appointments"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="appointment-container">
            <div className="head-element">
              <h1 className="head">Appointments</h1>
              <button
                type="button"
                onClick={this.starredAppointmentList}
                className="btn1"
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  appointmentItem={eachAppointment}
                  key={eachAppointment.id}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
