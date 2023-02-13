import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useSearchParams} from "react-router-dom";


class Roaster{
  constructor(total_plots, total_motors, cool_down_after_one_plot, break_after_all_plots, run_time, start_time, end_time, check_state_at) { 
    this.total_plots = parseInt(total_plots);
    this.total_motors = parseInt(total_motors);
    this.cool_down_after_one_plot = parseInt(cool_down_after_one_plot);
    this.break_after_all_plots = parseInt(break_after_all_plots);
    this.run_time = parseInt(run_time);
    this.start_time = this.get_a_datetime_obj(start_time);
    this.end_time = this.get_a_datetime_obj(end_time);
    if(check_state_at) {
        this.check_state_at = this.get_a_datetime_obj(check_state_at);
    } else {
        this.check_state_at = null;
    }
    
  }

  get_a_datetime_obj(str_time) {
    var date = new Date(0)
    var start_date_breakdown = str_time.split(".")
    date.setHours(parseInt(start_date_breakdown[0]))
    date.setMinutes(parseInt(start_date_breakdown[1]))
    return date;
  }
  
  add_minutes_to_date(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  }

  add_minutes_to_date_and_return_str(date, minutes) {
    var datetime = new Date(date.getTime() + minutes*60000);
    var minutes = datetime.getMinutes();
    var hours = datetime.getHours()
    if(minutes%10 == minutes) {
        minutes = "0"+minutes
    }
    if(hours%10 == hours) {
        hours = "0"+hours
    }
    return hours +":"+ minutes;
  }

  get_roaster() {
    var roaster = [] 
    var total_loops, total_count;
    total_count = 1
    if(this.total_plots % this.total_motors === 0) {
      total_loops = parseInt(this.total_plots/this.total_motors);
    } else {
      total_loops = parseInt(this.total_plots/this.total_motors)+1;
    }
    var total_plot_done = 0
    while (this.start_time < this.end_time){
      for(var i=0; i< total_loops; i++) {
        if(this.start_time > this.end_time) {
          break;
        }
        for(var j=0; j< this.total_motors; j++) {
          total_plot_done += 1
          var current_roaster_data = {
            "id": total_count++,
            "moter": "M"+(j+1),
            "start_time": this.add_minutes_to_date_and_return_str(this.start_time,0),
            "end_time": this.add_minutes_to_date_and_return_str(this.start_time, this.run_time),
            "plot": "P"+(total_plot_done),
          }
          
          if(this.check_state_at) {
              console.log(this.check_state_at)
            var current_start_time = this.add_minutes_to_date(this.start_time,0)
            var current_end_time = this.add_minutes_to_date(this.start_time, this.run_time)
            if(this.check_state_at > current_start_time  && this.check_state_at > current_end_time) {
                current_roaster_data['state'] = "#90EE90"
            } else if(this.check_state_at < current_start_time  && this.check_state_at < current_end_time) {
                current_roaster_data['state'] = "#D3D3D3"
            }
          }
          roaster.push(current_roaster_data)
        }
        
        if(total_plot_done < this.total_plots) {
          this.start_time = this.add_minutes_to_date(this.start_time, this.run_time + this.cool_down_after_one_plot)
        } else {
          this.start_time = this.add_minutes_to_date(this.start_time, this.run_time + this.break_after_all_plots)
          total_plot_done = 0
        }
      }
  }
  return roaster
  }

}

function setBackground(state) {
    return "red"

}

export default function Dashboard() {
    var [searchParams, setSearchParams] = useSearchParams();
    var check_state_at = searchParams.get("state_at")
    var roaster = new Roaster(searchParams.get("total_plots"), searchParams.get("total_motors"), searchParams.get("cool_down_after_one_plot"), searchParams.get("break_after_all_plots"), searchParams.get("run_time"), searchParams.get("start_time"), searchParams.get("end_time"), check_state_at)
    var rows =  roaster.get_roaster()
  return (
    <React.Fragment>
      <h1 style={{"textAlign": "center"}}>Roaster </h1>
      <p style={{"textAlign": "center"}}><a href='/' style={{cursor: 'pointer'}}>back to Home</a></p>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Plot</TableCell>
            <TableCell>Motor</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
              <TableRow key={row.id} style={{"background": `${row.state}`}}>
                <TableCell>{row.id}.</TableCell>
                <TableCell>{row.plot}</TableCell>
                <TableCell>{row.moter}</TableCell>
                <TableCell>{row.start_time}</TableCell>
                <TableCell>{row.end_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
