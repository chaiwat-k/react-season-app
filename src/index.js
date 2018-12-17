import React from 'react';
import ReactDOM from 'react-dom';

import Spinner from './Spinner';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         message: '',
    //         lat: null
    //     };
    // }

    state = {
        message: '',
        lat: null
    };

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat: position.coords.latitude
                });
            },
            (err) => {
                this.setState({
                    message: err.message
                });
            }
        )
    }

    render(){
        if(this.state.message && !this.state.lat){
            return (<div>Error: {this.state.message}</div>);
        }
        if(!this.state.message && this.state.lat){
            return (<SeasonDisplay lat={this.state.lat} />);
        }
        return (<Spinner message="Please, accept location request" />);
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);