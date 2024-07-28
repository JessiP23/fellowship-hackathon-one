import React, { Children, createContext, useEffect, useState } from "react";
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import axios from 'axios';


function Home () {
    const username = localStorage.getItem('username');
    const [attendance, setAttendance] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState(false);

    useEffect(() => {
        updateAttendance();
        fetchAttendanceStatus();
    }, []);

    const updateAttendance = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/attendance/list', {withCredentials: true});
            setAttendance(response.data);
        } catch (error) {
            console.error("ERror fetching attendance history", error);
        }
    };

    const fetchAttendanceStatus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/attendance/status', {withCredentials: true});
            setAttendanceStatus(response.data.status);
        } catch (error) {
            console.error('Error fetching attendance status', error);
        }
    }

    const scanUsers = async() => {
        const recordData = {
            date: new Date().toLocaleString(),
            location: "Admin",
        };

        try {
            await axios.post('http://localhost:5000/api/attendance', recordData, {withCredentials: true});
            await axios.post('http://localhost:5000/api/attendance/toggle', {}, {withCredentials: true});
            updateAttendance();
            fetchAttendanceStatus();
        } catch (error) {
            console.error('Error saving attendance data:', error);
        }
    }
    
    return (
        <div>
            <h1 className="form">Welcome, {username}</h1>
            <div className="row">
                <div className="col-7 text-center atten">
                    <h3>Attendance History</h3>
                    <ul>
                        {attendance.map((record, index) => (
                            <li key={index}>
                                {record.date} - {record.location}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-5 text-center attenn">
                    <div className="status-attendance">
                    <h3>Attendance Status</h3>
                    <Form>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                label="On"
                                name="group1"
                                type={type}
                                checked={attendanceStatus}
                                id={`inline-checkbox-1`}
                                readOnly
                            />
                            <Form.Check
                                inline
                                label="Off"
                                name="group1"
                                type={type}
                                checked={!attendanceStatus}
                                id={`inline-checkbox-2`}
                                readOnly
                            />
                            </div>
                        ))}
                    </Form>
                    </div>
                    <div>
                        <h3>Take Attendance</h3>
                        <Button className="button-styling" variant="outlined" onClick={scanUsers}>
                            Click to Scan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;