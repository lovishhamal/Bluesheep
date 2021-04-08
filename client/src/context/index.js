import React, { Component } from 'react';
import { getRoom } from '../services/room-service';

const Context = React.createContext({});

class ContextProvider extends Component {
  state = {
    allRooms: [],
    rooms: [],
    maxPrice: 0,
    minPrice: 0,
    price: 0,
    guest: 'All',
    capacity: 1,
    loading: true,
    booking: [],
    selectRoom: [],
    selectCapacity: [],
    user_id: null,
    email: null,
    name: null,
  };

  getUnique(items, value) {
    if (value === 'capacity') {
      return [...new Set(items.map((item) => item[value]))];
    }
    return [...new Set(items.map((item) => item[value]))];
  }

  componentDidMount = async () => {
    const { data } = await getRoom();
    let set = data.map((val) => val.price).sort((a, b) => a - b);

    let max = Math.max(...set);
    let min = Math.min(...set);
    let mid = set[Math.floor((set.length - 1) / 2)];

    const room = this.getUnique(data, 'roomname');
    const capacity = this.getUnique(data, 'capacity');

    this.setState({
      allRooms: data,
      rooms: data,
      price: max,
      maxPrice: max,
      minPrice: min,
      midPrice: mid,
      loading: false,
      selectRoom: room,
      selectCapacity: capacity,
    });
  };

  onChangePrice = (e, val) => {
    this.setState({ price: val }, this.filterRooms);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.filterRooms);
  };

  filterRooms = () => {
    let { allRooms, price, guest, capacity } = this.state;
    let temprooms = allRooms;

    price = parseInt(price);
    capacity = parseInt(capacity);

    if (guest !== 'All') {
      temprooms = temprooms.filter((room) => room.roomname === guest);
    }

    if (capacity !== 1) {
      temprooms = temprooms.filter((room) => room.capacity === capacity);
    }

    temprooms = temprooms.filter((room) => room.price <= price);

    this.setState({ rooms: temprooms });
  };

  setbooking = (data) => {
    this.setState({ booking: [...this.state.booking, data] });
  };

  deletebooking = (id, roomid) => {
    let filterBooking = [...this.state.booking];
    filterBooking = filterBooking.filter((item) => item.id !== roomid);
    this.setState({
      booking: filterBooking,
    });
  };

  setUserId = (id, name, email) => {
    this.setState({ ...this.state, user_id: id, name, email });
  };

  setAllRooms = (id) => {
    this.setState({
      ...this.state,
      allRooms: this.state.allRooms.filter((item) => item.id !== id),
    });
  };
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          onChangePrice: this.onChangePrice,
          handleChange: this.handleChange,
          setbooking: this.setbooking,
          deletebooking: this.deletebooking,
          setUserId: this.setUserId,
          setAllRooms: this.setAllRooms,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Context, ContextProvider };
