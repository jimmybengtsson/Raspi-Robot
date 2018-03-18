import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Sensors.css';
import {Line} from 'react-chartjs-2';
import CircularProgress from 'material-ui/CircularProgress';

class Charts extends Component {

    constructor(props){
        super(props);

        this.state = {

            isLoaded: false,
        };

        this.data = {
            labels: [],
            datasets: [
                {
                    label: '',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                }
            ]
        };
    }

    addDataToChart() {
        this.props.data.forEach((i) => {
            this.data.labels.push(i.label);
            this.data.datasets[0].data.push(i.value);
        });
        this.data.datasets[0].label = this.props.type;
        console.log(this.data);
        this.setState({
            isLoaded: true,
        })
    }

    componentDidMount() {
        this.addDataToChart();
    }

    render() {
        return (
                <div className="HueSensors">
                    {this.state.isLoaded ? (
                        <Line data={this.data} />
                    ) : (
                        <CircularProgress style={style.spinner}/>
                    )}
                </div>
        );
    }
}

export default Charts;

let data = {
    labels: [],
    datasets: [
        {
            label: '',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }
    ]
};

const style = {
    spinner: {

        margin: 'auto',
    }
};