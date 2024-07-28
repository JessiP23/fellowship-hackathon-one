import React, { useEffect, useState } from "react";
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '@mui/material/Button';
import './manager.css';
import "react-datepicker/dist/react-datepicker.css";



function TeacherHome () {
    const teacherUsername = localStorage.getItem('teacherUsername');
    const [attendanceStatus, setAttendanceStatus] = useState(false);

    useEffect(() => {
        const status = localStorage.getItem('attendanceStatus') === 'true';
        setAttendanceStatus(status);
    }, []);

    const toggleAttendance = () => {
        const newStatus = !attendanceStatus;
        setAttendanceStatus(newStatus);
        localStorage.setItem('attendanceStatus', newStatus);
    };


    return (
        <div>
            <h1 className="form text-center">Welcome back Teacher {teacherUsername}</h1>

            <div className="text-center">
                <h3 className="text-center">Take Attendance</h3>
                <Button className={`button-styling ${attendanceStatus ? 'active': 'inactive'}`} variant="outlined" onClick={toggleAttendance}>
                {attendanceStatus ? 'Stop Attendance' : 'Start Attendance'}
            </Button>
            </div>
        </div>
    )
}

export default TeacherHome;