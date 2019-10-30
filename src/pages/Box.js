import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar';
import socketIOClient from 'socket.io-client';


// Service
//import api from '~/service/api'
// Styles
import './Box.css'
// Custom Components


export default class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          percentage: 0,
          total: 100,
          errors: 0,
          endpoint: 'http://localhost:8081',
          personId: "007",
        };
      }
    
    componentDidMount() {
        const { endpoint, personId, total } = this.state;
        let { percentage } = this.state;
        const socket = socketIOClient(endpoint, { query: {  socketId: personId }});
        socket.on('connect', () =>  console.log("Tô logado"));
        
        socket.on('progress', progress => this.setState({ 
            open: true,
            percentage: progress.percentage, 
            total: progress.total, 
            errors: progress.errors,
            success: progress.success
        }, console.log(progress)))
        
        // Only for test of progress
        this.timer = setInterval(() =>  {
            this.setState({
              open: true,
              percentage: percentage < total ? percentage++ : percentage
            })
           }, 1000);
    }
    
    handleSocketShutdown = () => {
        const socket = socketIOClient()
        socket.on('disconnect', () => console.log("Tô deslogado"));
    };
    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };


 render() {
    const { 
        open,
        percentage,
        total,
    } = this.state;


    return (
    <div>{open === true ?
        <React.Fragment>
            
            <Snackbar
                open={open}
                message={`Enviando ${percentage} arquivo de ${total}`}
                onRequestClose={this.handleRequestClose}
                style={{ left: "88%", height: "18.5%", visibility: 'visible',  transform: 'translate(-50%, 0px)' }}
                contentStyle={{ opacity: '1' }}      
            />                
            <Snackbar
                open={open}
                action={"CANCELAR"}
                message={`Processando`}
                onRequestClose={this.handleRequestClose}
                bodyStyle={{backgroundColor: "#e4e4e4"}}
                style={{ left: "88%", height: "12.5%" }}
                contentStyle={{ color: "black" }}   
            />
            <Snackbar
                open={open}
                message={`Registro-presenca-outubro.xls`}
                onRequestClose={this.handleRequestClose}
                style={{ left: "88%" }}
                bodyStyle={{backgroundColor:"rgba(255, 255, 255, 0.9)" }}
                contentStyle={{ color: "black" }}    
            />        
        </React.Fragment>
        : <p>Loading...</p>}
    </div>    
    
    );
 }
}
