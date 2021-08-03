import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../img/magnox-logo.png';
import Dp from '../img/placeholder.jpg';
import {Redirect,Link} from 'react-router-dom';
import Section from './Section';

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetails : {
                user_img :'',
                user_info : {
                    Name  : 'Suvayan Sardar',
                    Email : 'suvayan.s30@gmail.com',
                    Phone : 9875562401
                }
            },
            examDetails : {
                Title:	'Demo Test A',
                Time:	30,
                Marks:	60,
                Program:	'Learn Programing Using Python',
                Code:	'PY001',
                Section:	4
            }
        }
    }

    _getUserDetails = async (user_id) => {
        let id = user_id;
        let responce = await axios.post('https://www.apitest45.techmagnox.com/details_api/user_details/',{id});
        return responce;
    }

    _getExamDetails = async (exam_id) => {
        let id = exam_id;
        let responce = await axios.post('https://www.apitest45.techmagnox.com/details_api/exam_details/',{id});
        return responce;
    }

    _startExam = async () => {
        let time       = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let {test_id,test_can} = JSON.parse(sessionStorage.getItem('auth'));
        let id         = test_can;
        await axios.put('https://www.apitest45.techmagnox.com/details_api/start_exam',{id, time}).then((response) => {
            if(response.status === 200) {
                this._getExamDetails(test_id).then((examData) => {
                    let exam = examData.data.Title;
                    sessionStorage.setItem('exam', exam);
                    window.location.reload();
                });
            }
        })  

    }



    componentDidMount(){
        if(sessionStorage.getItem('auth')){
            let {user_id, test_id} = JSON.parse(sessionStorage.getItem('auth'));
            
            this._getUserDetails(user_id).then((res) => {
                let studentName = res.data.user_info.Name;
                sessionStorage.setItem('studentName', studentName);
                this.setState({
                    userDetails : {
                        user_img  : res.data.user_img,
                        user_info : res.data.user_info
                    }
                });
            });

            this._getExamDetails(test_id).then((res) => {
                this.setState({
                    examDetails : res.data
                })
            })
        }
    }

    render() {

        if(!sessionStorage.getItem('auth')){
            return <Redirect to="/" />
        }else if(sessionStorage.getItem('exam')){
            return <Redirect to="/test" />
        }


        return (
            <div className="container">
                <div className="row mt-5"> 
                    <div className="col-md-5 m-auto"> 
                        <div className="text-center"> 
                            <img src={Logo} className="image-fluid" alt="" width="50%" />
                        </div>
                    </div>
                </div>
                <div className="row mt-5 align-items-stretch">
                    <Section 
                        title = "Student Details"
                        img={this.state.userDetails.user_img || Dp}
                        info={this.state.userDetails.user_info}
                    />
                    <Section 
                        title = "Examination Details"
                        date  = {`${new Date().toISOString().slice(0, 19).replace('T', ' ')}`}
                        info={this.state.examDetails}
                    />
                </div>
                <div className="row mt-5 pt-2">
                    <div className="col-md-5 offset-md-1">
                        <Link  className="btn btn-danger btn-lg btn-block" to = '/thankyou'>Click to exit Examination</Link>
                    </div>
                    <div className="col-md-5 offset-md-1">
                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this._startExam}>Click to start Examintion</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;