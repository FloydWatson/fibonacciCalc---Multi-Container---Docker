import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    // fetches all calculated values from api. utilizes redis so valuies returned as an object
    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    // fetches all indexes from api. utilizes postgres so returned as an array
    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: seenIndexes.data });
    }

    // bound function
    // async because we are sending information to api
    handleSubmit = async (event) => {
        event.preventDefault();

        // using axios to call api for calc
        await axios.post('/api/values', {
            index: this.state.index
        });

        // reset index value to empty string
        this.setState({ index: '' });
    };

    // returns all indexes in a string seperated by commas
    renderSeenIndexes(){
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {

        const entries = [];
        // loops through array and returns html element for each value created
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }

        return entries;
    }

    // component rendered to screen. 
    // form has call back function to handle submit
    // input has tag to set index input
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input 
                        value={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indexes i have seen:</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated Values</h3>
                {this.renderValues()}
            </div>


        );
    }

    

}

export default Fib;

