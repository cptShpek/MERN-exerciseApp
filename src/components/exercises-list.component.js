import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

const Exercise = props => (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration} minutes</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={'/edit/' + props.exercise._id}>Edit</Link> | <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>Delete</a>
            </td>
        </tr>
)


class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.state= {
            exercises: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({
                    exercises: response.data
                })
            })
            .catch(err => console.log('Error: ' + err))
    }

    exerciseList = () =>{
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise ={currentExercise} deleteExercise={this.deleteExercise} key ={currentExercise._id} />
        })
    }

    deleteExercise = (id) =>{
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ' + err))

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    render() {
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExercisesList;