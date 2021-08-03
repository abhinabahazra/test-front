import React from 'react';

const Nav = ({defaultSection, sections, changeDefaultSection, quesNo, totalRecords, endTheTest}) => {
    let optionList = () => (
        defaultSection && sections && sections.map((section, i) => {
            //console.log(defaultSection === section.id);
            return <option key={i} value={section.id} selected={(defaultSection === section.id)}>{section.section_name}</option>;
        })
    );

    return (
        <nav>
            <div className="container-fluid ">
                <div className="row text-center header">
                    <div className="col-sm-4"><strong>{sessionStorage.getItem('studentName')}</strong></div>
                    <div className="col-sm-4"><strong>{sessionStorage.getItem('exam')}</strong></div>
                    <div className="col-sm-4">
                        <strong className="mr-5">Time Left :45:20 </strong>
                        <button type="button" className="btn btn-test" onClick={endTheTest}>Click to end test</button>
                    </div>
                </div>
                <div className="row timing">
                    <div className="col-sm-5 text-center">
                        <select className="form-select mr-5" onChange={changeDefaultSection}>
                            {optionList()}
                        </select>
                        <span>Question {quesNo}/{totalRecords}</span>
                    </div>
                    <div className="col-sm-7 " style={{color: 'red'}}>
                        <strong>Start Time : 10:00 AM, End Time : 11:00 AM, Test Duaration: 60 Min</strong>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
