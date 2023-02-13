import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material'
import { useState } from "react";
import ReactDOM from 'react-dom/client';


export default function Home() {
    return (
        <form action='/dashboard'>
            <h1>Fill the details - </h1>
            <div style={{margin: "3px"}}>
                <TextField style={{margin: "2px"}} label="Total plots" name="total_plots" type="number" placeholder='total_plots' required />
                <TextField style={{margin: "2px"}} label="Total motors" name="total_motors" type="number" placeholder='total_motors' required/>
            </div>
            <div style={{margin: "3px"}}>
            <TextField style={{margin: "2px"}} label="Run time" name="run_time" type="number" placeholder='in mins'required />
                <TextField style={{margin: "2px"}} label="Cool down after one plot" name="cool_down_after_one_plot" type="number" placeholder='in mins'required />
            </div>
            <div style={{margin: "3px"}}>
            <TextField style={{margin: "2px"}} label="Break after all plots" name="break_after_all_plots" type="number" placeholder='in mins'required />
                <TextField style={{margin: "2px"}} label="Start time" name="start_time" type="text" placeholder='08.00'required />
            </div>
            <div style={{margin: "3px"}}>
                <TextField style={{margin: "2px"}} label="End time" name="end_time" type="text" placeholder='20.00'required />
                <TextField style={{margin: "2px"}} label="Check state at" name="state_at" type="text" placeholder='10.16'/>
            </div>
            <div style={{margin: "3px"}}>
                <TextField label="" type="submit" />
            </div>
        </form>
    )
}