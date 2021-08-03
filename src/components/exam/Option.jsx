import React, { Component }from 'react';
import axios from 'axios';

class Option extends Component {
    constructor(props){
        super(props);
        let {test_can, pub_id} = sessionStorage.getItem('auth') && JSON.parse(sessionStorage.getItem('auth'));
        this.state = {
            givenAns : 0,
            test_can,
            pub_id,
        }
        
    }
    onChangeHandler = async (e) => {

        let reqData = {
            test_can   : this.state.test_can,
            pub_id     : this.state.pub_id,
            sec_id     : this.props.section,
            ques_id    : this.props.question.id,
            option_id  : e.target.value,
            ques_marks : this.props.question.marks
        }
        await axios.post('https://www.apitest45.techmagnox.com/exam_api/give_answer/', reqData);
        this.setState({givenAns : e.target.value},() => console.log(this.state.givenAns));

    }

    _getGivenAns = async () => {
        if(this.props.question && this.props.section){
            let reqData = {
                id : this.props.question.id,
                section : this.props.section,
                test_can   : this.state.test_can,
                pub_id     : this.state.pub_id,
            }
            await axios.post('https://www.apitest45.techmagnox.com/exam_api/question_attemp', reqData).then((res) => {
                if(res.status === 200){
                    this.setState({
                        givenAns : res.data.option_id
                    })
                }
            });
            
        }
    }

    componentDidUpdate(prevProps, prevState){
        if((prevProps.section !== undefined && prevProps.question !== undefined) ){
            if((prevProps.question.id !== this.props.question.id)){              
                this._getGivenAns();
            }
        }
    }

    componentDidMount(){
        this._getGivenAns();
    }

    render(){
        let optionsList = () => (
            this.props.options && this.props.options.map((item, i) => {
                return(
                    <li key={i}>
                        <input 
                            className="mr-3"
                            type="radio" 
                            value={item.id} 
                            onChange={this.onChangeHandler}
                            checked = {parseInt(this.state.givenAns) === item.id}
                        /> 
                        {`${item.body.replace( /(<([^>]+)>)/ig, '')}`}
                    </li>
                );
            })
        )
        return (
            <div className="col-sm-5 text-left" id="side_left">
                <h3>Options are as follows</h3>
                <ol>
                    {optionsList()}
                </ol>
            </div>
        ) 
    }
}

export default Option;
