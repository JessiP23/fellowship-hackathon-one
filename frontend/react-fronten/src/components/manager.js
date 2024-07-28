import React, { useEffect, useState } from "react";
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '@mui/material/Button';
import './manager.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";



function TeacherHome () {
    const username = localStorage.getItem('username');
    const [attendanceStatus, setAttendanceStatus] = useState(false);

    useEffect(() => {
        fetchAttendanceStatus();
    }, []);

    const fetchAttendanceStatus = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/attendance/status', {withCredentials: true})
            setAttendanceStatus(response.data.status);
        } catch (error) {
            console.error('Error fetching attendance status', error);
        }
    };

    const toggleAttendance = async () => {
        try {
            await axios.post('http://localhost:5000/api/attendance/toggle', {}, {withCredentials: true});
            fetchAttendanceStatus();
        } catch (error) {
            console.error('Error toggling attendance status:', error);
        }
    };

    return (
        <div>
            <h1 className="form">Welcome back Teacher {username}</h1>

            <h3>Take Attendance</h3>
            <Button className={`button-styling ${attendanceStatus ? 'active' : 'inactive'}`} variant="outlined" onClick={toggleAttendance}>
                {attendanceStatus ? 'Stop Attendance' : "Start Attendance"}
            </Button>
        </div>
    )
}

export default TeacherHome;