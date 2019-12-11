import React from "react";
import { shallow } from "enzyme";
import Signup from "../index";

describe("Signup", () => {
    it("Should render without crashing", () => {
        shallow(<Signup />);
    });
});
