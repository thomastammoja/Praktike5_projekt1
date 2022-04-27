import React, { Component } from "react";
import axios from 'axios';

export default class RoomSensors extends Component {
    state = {
        room_number: '',
        sensors: []
    };
    readData() {
        this.setState({ room_number: this.props.match.params.number })
        axios.get(`http://localhost:8000/api/room/'${this.props.match.params.number}'/sensors`)
            .then(res => {
                this.setState({ sensors: res.data.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        this.readData()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.number !== this.props.match.params.number) {
            this.readData()
        }
    }
    render() {
        const { room_number, sensors } = this.state;
        if (sensors.length === 0) {
            return (
                <div>
                    <h1>Room: {room_number}</h1>
                    <div>No data</div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Room: {room_number}</h1>
                    <ul className="list-group">
                        {sensors.map(s => (
                            <li className="list-group-item" key={s.id}>
                                {s.sensorname}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}