import React, { Children, createContext, useState } from "react";
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button'


function Home () {
    const username = localStorage.getItem('username');
    
    return (
        <div>
            <h1 className="form">Welcome, {username}</h1>
            <div className="row">
                <div className="col-7 text-center atten">
                    <h3>Attendance History</h3>
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
                                id={`inline-${type}-1`}
                            />
                            <Form.Check
                                inline
                                label="Off"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                            />
                            </div>
                        ))}
                    </Form>
                    </div>
                    <div>
                        <h3>Take Attendance</h3>
                        <Button className="button-styling" variant="outlined">
                            Click to Scan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;