import React from 'react';

const Section = (props) => (
    <div className="col-md-5 offset-md-1"> 
        <div className="card p-3" style={{width: '100%', background:'#efefef', boxShadow: '5px 5px #888888'}}>
            <h5 className="card-title text-center">{props.title}</h5>
            {props.img && <img src={props.img} className="image-fluid rounded mx-auto d-block" alt="..." width="50%" />}
            <div className="card-body">
                <table className="table">
                    <tbody>
                        {props.date &&
                            <tr>
                                <td>Date: </td>
                                <td>{props.date}</td>
                            </tr>
                        }
                        {props.info && Object.keys(props.info).map((item ,i) => (
                            <tr key={i}>
                                <td>{item}: </td>
                                <td>{props.info[item]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)

export default  Section;