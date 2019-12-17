import React from "react";

const ShareModel = (props) => {
    return (
        <div id="myModal" className="sharingmodal">
            <div className="sharingmodal-content">
                <span className={"sharingmodel-heading"}> Share with others </span>
                <span className={"people-span"}> People </span>
                <div className={"sharingmodel-body"}>
                    <textarea className={"sharewith-textarea"}/>
                    <div className="sharetype-dropdown">
                        <button className="dropbtn">share type</button>
                        <div className="dropdown-content">
                            <a href="#">can view</a>
                            <a href="#">can edit</a>
                        </div>
                    </div>
                </div>
                <button className={"share-button"}>Share</button>
            </div>
        </div>
    )
};

export default ShareModel;