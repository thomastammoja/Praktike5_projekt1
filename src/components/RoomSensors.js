import React, { Component } from "react";
import axios from 'axios';

export default class RoomSensors extends Component {
    state = {
        room_number: '',
        sensors: []
    };
    readData() {
        this.setState({ room_number: this.props.match.params.number })
        axios.get(`http://localhost:8000/api/room/'${this.props.match.params.number}'/sensors/data`)
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
        const { room_number, sensors} = this.state;
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
                    <table className="table mt-5 text-center">
                        <thead>
                            <tr>
                                <th>Last measuring</th>
                                <th>Sensor</th>
                                <th>Measured value</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sensors.map((s, pos) => (
                                <tr key={s.id}>
                                    <td>{s.lasttimestamp}</td>
                                    <td>{s.sensor}</td>
                                    <td>{s.measuredvalue}</td>
                                    <td>{s.unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/*<ul className="list-group">
                        {sensors.map(s => (
                            <li className="list-group-item" key={s.id}>
                                {s.Sensor}
                            </li>
                        ))}
                        </ul>*/}
                </div>
            );
        }
    }
}