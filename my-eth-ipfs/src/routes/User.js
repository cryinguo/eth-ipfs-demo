import React, {Component} from 'react'
import { Button } from 'react-bootstrap';

import ipfs from '../eth-ipfs/ipfs'

class User extends Component {

    constructor(props){
        super(props)
        this.state = {
            files: []
        }
    }
    
    getFileList = async() => {
        await ipfs.files.ls('/test1', {long: true}, (err, files) => {
            files.forEach((file) => {
              console.log(file)

              this.setState((prevState) => ({
                counter: prevState.files.push(file)
              }));
            })
        })

    }
    
    render() {
        return(
            <div>
                <h2>User file </h2>
                <hr/>
                
                <ul>
                    <Button onClick = {this.getFileList}> Display </Button>
                    <hr/>
                    {this.state.files.map(file => 
                        <li key={file.name}>
                        {file.name+file.hash}
                        <hr/>
                        </li> )}
                </ul>
            </div>

        )
    }
}

export default User;