import React, { Component, Fragment} from 'react';
import {Redirect,useHistory} from 'react-router-dom';
import './Exam.css';
import swal from 'sweetalert';
import Operations from '../js'
import Nav from './Nav';
import Footer from './Footer';
import Question from './Question';
import Option from './Option';
import Button from './Button';

class TestBox extends Component {

    constructor(props){
        super(props);

        this.state={
            sectionData : {},
            questionData : {}
        }
    }
    authSessionData = JSON.parse(sessionStorage.getItem('auth'));
    operations      = sessionStorage.getItem('auth') && new Operations(this.authSessionData.test_id);

    endTheTest = () => {
        // let history = useHistory();
        // history.push("/thankyou");
        window.location.href= "/thankyou";
    }

    changePage = (page) => {
        this.setState({
            questionData : {...this.state.questionData,currentPage:page} 
        },() => {
            this.state.questionData.pageChange(page, this.state.sectionData.defaultSection).then((data) =>{
                this.setState({ 
                    questionData : data
                })
            })
        })
    }

    getChangeSectionByNP = (id) => {
        this.setState({
            sectionData:{...this.state.sectionData,defaultSection: id}
        },() => {
            this.state.questionData.sectionChange(this.state.sectionData.defaultSection).then((data) => {
                this.setState({questionData : data});
            })
        })        
    }

    getChangeSectionByNext = (id) =>{
        let sid = parseInt(id);
        let section = this.state.sectionData.sections;
        for(let i = 0; i < section.length; i++){
            if(section[i].id === sid){
                if(section[i+1]){
                    swal({
                        title: `${sessionStorage.getItem('studentName')}`,
                        text: "Are you sure, you want to go to next section?",
                        icon: "warning",
                        buttons: true,
                        successMode: true,
                    }).then(next => {
                        if (next) {
                            this.getChangeSectionByNP(section[i+1].id);
                        }
                    });
                }else{
                    swal({
                        title: `${sessionStorage.getItem('studentName')}`,
                        text: "Are you sure, you want to end this exam?",
                        icon: "warning",
                        buttons: true,
                        successMode: true,
                    }).then(next => {
                        if (next) {
                            this.endTheTest();
                        }
                    });
                }
            }
        }
    }

    getChangeSectionByPrevious = (id) => {
        let sid = parseInt(id);
        let section = this.state.sectionData.sections;

        for(let i = 0; i < section.length; i++){
            
            if(section[i].id === sid){
                if(section[i-1]){
                    swal({
                        title: `${sessionStorage.getItem('studentName')}`,
                        text: "Are you sure, you want to go back to previous section?",
                        icon: "warning",
                        buttons: true,
                        successMode: true,
                    }).then(prev => {
                        if (prev) {
                            this.getChangeSectionByNP(section[i-1].id);
                        }
                    });
                }else{
                    swal({
                        title: `${sessionStorage.getItem('studentName')}`,
                        text: "This is the first question of this exam. You can't go back.",
                        icon: "error",
                        dangerMode: true,
                    })
                }
            }
        }
    }

    goNext = () =>{
        this.setState({
            questionData : {...this.state.questionData,currentPage: (this.state.questionData.currentPage + 1)} 
        },() => {
            if(this.state.questionData.records < this.state.questionData.currentPage){
                this.getChangeSectionByNext(this.state.sectionData.defaultSection);
            }
            
            this.state.questionData.next(this.state.questionData.records, this.state.sectionData.defaultSection).then((data) =>{
                this.setState({ 
                    questionData : data
                })
            })
        })        
    }

    goPrev = () =>{
        this.setState({
            questionData : {...this.state.questionData,currentPage: (this.state.questionData.currentPage - 1)} 
        },() => {
            if(this.state.questionData.currentPage === 0){
                this.getChangeSectionByPrevious(this.state.sectionData.defaultSection);
            }
            this.state.questionData.prev(this.state.sectionData.defaultSection).then((data) =>{
                this.setState({ 
                    questionData : data
                })
            })
        })                 
    }

    cheangeSection = (e) => {
        this.setState({
            sectionData:{...this.state.sectionData,defaultSection:e.target.value}
        },() => {
            this.state.questionData.sectionChange(this.state.sectionData.defaultSection).then((data) => {
                this.setState({questionData : data});
            })
        })
    }

    componentDidMount() {
        if(this.operations){
            this.operations._getSections().then((data) => {
                this.setState({
                    sectionData : data
                },() => {
                    this.operations._getQuestion(this.state.sectionData.defaultSection).then((data) => {
                        this.setState({questionData : data});
                    })
                });
            })
        }
    }


    
    render() {
        if(!sessionStorage.getItem('auth') && !sessionStorage.getItem('exam')){
            return <Redirect to="/" />
        }else if(sessionStorage.getItem('auth') && !sessionStorage.getItem('exam')){
            return <Redirect to="/test" />
        }

        return (
            <Fragment>
                <Nav 
                    defaultSection = {this.state.sectionData.defaultSection}
                    sections = {this.state.sectionData.sections}
                    changeDefaultSection = {this.cheangeSection}
                    totalRecords = {this.state.questionData.records}
                    quesNo       = {this.state.questionData.currentPage}
                    endTheTest   = {this.endTheTest}
                />
                <div className="container-fluid ">
                    <div className="row content">
                        <Question 
                            quesNo   = {this.state.questionData.currentPage}
                            question = {this.state.questionData.question} 
                        />
                        <Option 
                            section  = {this.state.sectionData.defaultSection}
                            options  = {this.state.questionData.options}
                            question = {this.state.questionData.question} 
                        />
                        <Button 
                            totalRecords ={this.state.questionData.records}
                            currentPage = {this.state.questionData.currentPage}
                            changePage  = {this.changePage}
                        />
                    </div>
                </div>
                <Footer 
                    goPrev   = {this.goPrev}
                    goNext   = {this.goNext}
                />
            </Fragment>
        )
    }
}

export default TestBox;
