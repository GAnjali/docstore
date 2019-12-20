import React from "react";

const ShareModel = (props) => {
    let style = {};
    if (props.show === true) {
        style = {display: "block"};
    }
    return (
        <div id="myModal" className="sharingmodal" style={style}>
            <div className="sharingmodal-content">
                <span className="close" onClick={props.handleClose}>&times;</span>
                <span className={"sharingmodel-heading"}> Share with others </span>
                <span className={"people-span"}> People </span>
                <div className={"sharingmodel-body"}>
                    <textarea className={"sharewith-textarea"} name={"sharingWithUser"} placeholder={"Enter email addresses..."} onChange={props.handleInput}/>
                    <div className="sharetype-dropdown">
                        <button className="dropbtn">share type</button>
                        <div className="dropdown-content">
                            <p onClick={props.handleShareType} id={"View"}>View</p>
                            <p onClick={props.handleShareType} id={"Edit"}>Edit</p>
                        </div>
                    </div>
                </div>
                <button className={"share-button"} onClick={props.handleShare}>Share</button>
            </div>
        </div>
    )
};

export default ShareModel;