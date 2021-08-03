import React from 'react'

function Question({quesNo, question}) {
    //console.log(question);
    return (
        <div className="col-sm-5 sidenav" id="side_left">
            <p>
                <span>
                {`${quesNo && quesNo}. ${question && question.qbody.replace( /(<([^>]+)>)/ig, '')}`}
                </span>
            </p>
            <div className="instruction">
                <p>Section Instructions</p>
            </div>
        </div>
    )
}

export default Question;
