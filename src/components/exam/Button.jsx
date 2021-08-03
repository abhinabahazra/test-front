import React from 'react';

function Button({totalRecords, currentPage, changePage}) {
    var btns = [];
    for (let i = 1; i <= totalRecords; i++) {
        btns.push(i);
    }
    return (
        <div className="col-sm-2 sidenav2">
            <div className="well">
                <h3></h3>
                <div className="number">
                    { 
                        btns && btns.map((page, index) => {
                            if(currentPage === page){
                                return(
                                    <button 
                                        key={index} 
                                        type="button" 
                                        className="btn-primary section_button"
                                        onClick={() => changePage(index+1)}
                                    >
                                        {page}
                                    </button>
                                )
                            }else{
                                return(
                                    <button 
                                        key={index} 
                                        type="button" 
                                        className="section_button"
                                        onClick={() => changePage(index+1)}
                                    >
                                        {page}
                                    </button>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Button;
