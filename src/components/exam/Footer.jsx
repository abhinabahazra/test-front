import React from 'react';

const Footer = ({goPrev, goNext}) => {
    return (
        <div className="container-fluid footer">
            <div className="row" id="down">
                <div className="col-sm-4 text-left">
                    <button 
                        type="button" 
                        className="btn btn-test"
                        onClick={goPrev}
                    >
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        Back
                    </button>
                </div>
                <div className="col-sm-4 text-center" style={{color: 'white'}}>Test Instructions</div>
                <div className="col-sm-4 text-right">
                    {/* <button type="button" className="btn btn-test" style={{marginRight: '5px'}}>
                        Skip It
                    </button>  */}
                    <button 
                        type="button" 
                        className="btn btn-test"
                        onClick={goNext}
                    >
                        Next
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="glyphicon glyphicon-chevron-right"></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Footer;
