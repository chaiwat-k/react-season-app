import React from 'react';
import ReactDOM from 'react-dom';

import Spinner from './Spinner';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            message: '',
            lat: null
        };
    }

    // Can do this instead of the constructor method
    // state = {
    //     message: '',
    //     lat: null
    // };

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

    renderContent(){
        if(this.state.message && !this.state.lat){
            return (<div>Error: {this.state.message}</div>);
        }
        if(!this.state.message && this.state.lat){
            return (<SeasonDisplay lat={this.state.lat} />);
        }
        return (<Spinner message="Please, accept location request" />);
    }

    render(){
        return (
            <div className="border solid red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);