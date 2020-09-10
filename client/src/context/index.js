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
  };

  componentDidMount = async () => {
    const { data } = await getRoom();
    let set = data.map((val) => val.price).sort((a, b) => a - b);

    let max = Math.max(...set);
    let min = Math.min(...set);
    let mid = set[Math.floor((set.length - 1) / 2)];

    this.setState({
      allRooms: data,
      rooms: data,
      price: max,
      maxPrice: max,
      minPrice: min,
      midPrice: mid,
      loading: false,
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

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          onChangePrice: this.onChangePrice,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Context, ContextProvider };
