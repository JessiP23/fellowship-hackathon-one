import React, { useEffect, useState } from "react";
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
        const status = localStorage.getItem('attendanceStatus') === 'true';
        setAttendanceStatus(status);

        const intervalId = setInterval(() => {
            const updatedStatus = localStorage.getItem('attendanceStatus') === 'true';
            setAttendanceStatus(updatedStatus);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    const updateAttendance = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/attendance/list', {withCredentials: true});
            setAttendance(response.data);
        } catch (error) {
            console.error("ERror fetching attendance history", error);
        }
    };


    const scanUsers = async() => {
        const recordData = {
            date: new Date().toLocaleString(),
            location: "Admin",
        };

        try {
            await axios.post('http://localhost:5000/api/attendance', recordData, {withCredentials: true});
            updateAttendance();
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
                                id={`inline-checkbox-1`}
                                checked={attendanceStatus}
                                readOnly
                            />
                            <Form.Check
                                inline
                                label="Off"
                                name="group1"
                                type={type}
                                id={`inline-checkbox-2`}
                                checked={!attendanceStatus}
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