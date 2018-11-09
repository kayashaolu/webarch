import React from "react";
import ReactDOM from "react-dom";
import firebase from './firebase.js';

class ReservationItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    this.props.handleListItemClick(this.props.id);
  }

  render() {
    return (
      <li onClick={this.handleClick}>
        {this.props.personName}: {this.props.isGoing ? "We're going" : "Not going"} with {this.props.numberOfGuests} guest(s)
      </li>
    );
  }
}

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
      personName: "",
      history: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const rsvpRef = firebase.database().ref('reservations');
    const rsvp = {
      isGoing: this.state.isGoing,
      numberOfGuests: this.state.numberOfGuests,
      personName: this.state.personName
    }

    rsvpRef.child(this.state.personName).set(rsvp);
    this.setState({
      isGoing: false,
      numberOfGuests: 0,
      personName: ""
    });
  }

  handleListItemClick(key) {
    const rsvpRef = firebase.database().ref(`/reservations/${key}`);
    rsvpRef.remove();
  }

  componentDidMount() {
    const rsvpRef = firebase.database().ref('reservations');
    rsvpRef.on('value', (snapshot) => {
      let rsvps = snapshot.val();
      let newHistory = [];

      for(let rsvp in rsvps) {
        newHistory.push({
          id: rsvp,
          isGoing: rsvps[rsvp].isGoing,
          numberOfGuests: rsvps[rsvp].numberOfGuests,
          personName: rsvps[rsvp].personName
        });
      }

      this.setState({
        history: newHistory
      })
    })
  }

  render() {
    const rsvpItems = this.state.history.map((rsvp) =>
    <ReservationItem key={rsvp.id} id={rsvp.id} isGoing={rsvp.isGoing} numberOfGuests={rsvp.numberOfGuests}
      handleListItemClick={this.handleListItemClick} personName={rsvp.personName}/>
    );

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Who:
            <input
              name="personName"
              type="text"
              onChange={this.handleInputChange}
              value={this.state.personName}/>
          </label>
          <br />

          <label>
            Is going:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Number of guests:
              <select
                name="numberOfGuests"
                value={this.state.numberOfGuests}
                onChange={this.handleInputChange}>
                <option value="0">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
            <br />
            <input type="submit" value="RSVP" />
          </form>
          <div>
            <ul>
              {rsvpItems}
            </ul>
          </div>
        </div>
      );
    }
  }

  ReactDOM.render(
    <Reservation />,
    document.getElementById('root')
  );
