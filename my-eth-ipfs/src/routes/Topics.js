import React, {Component} from 'react'
import {Table, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './Topics.css'
import config from '../config'

class Topics extends Component{
    state = {
        fileName:'',
        fileHash:''
    }

    searchFile = () => {
        console.log("search file : ",document.getElementById('filePara').value);
        fetch(config.express.url + config.express.port + "/search?filePara=" + document.getElementById('filePara').value)
            .then(res => res.text())
            .then(res => {
            console.log("file :", JSON.parse(res));
            let fileName = JSON.parse(res).name;
            let fileHash = JSON.parse(res).hash;
            this.setState({fileName});
            this.setState({fileHash});
        })
    } 

    downloadFile = async () => { 
        //let cid = document.getElementById("ipfsHash").innerText
        fetch(config.express.url + config.express.port + "/topic?cid=" + this.state.fileHash + "&filename=" + this.state.fileName)
          .then(res => res.text())
          .then(res => {
            console.log("downloading statues :", res)
          })
    }
    

    render() {
        return (
                
            <div className = 'Topics'>
                <header className = 'Topics-Header'>
                    <h2>Topics</h2>
                </header>
                <hr/>
                <Form >
                    <FormGroup>
                        <ControlLabel>fileName or fileHash</ControlLabel>{' '}
                        <FormControl id="filePara" 
                        placeholder="example:'hello-world.txt' or 'QmcFc6EPhavNSfdjG8byaxxV6KtHZvnDwYXLHvyJQPp3uN'" />
                    </FormGroup>{' '}
                    <Button           
                        bsStyle="primary" 
                        onClick = {this.searchFile}>
                        Search
                    </Button>
                </Form>
                <Table striped bordered  condensed hover>
                    <thead>
                        <tr>
                        <th>File Name</th>
                        <th>File Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{this.state.fileName}</td>
                        <td >{this.state.fileHash}</td>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick = {this.downloadFile}>Download</Button>
            </div>
        )
    }
}

export default Topics;