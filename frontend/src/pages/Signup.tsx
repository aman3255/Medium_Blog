import React from "react";
import { Qoute } from "../components/Qoute";
import{ Auth } from "../components/Auth";
const Signup = () => {
    return (
        <div>
            <div className="grid grid-cols-2">
                <div>
                    <Auth/>
                </div>
                <div className="invisible md:visible">
                    <Qoute />
                </div>
            </div>
        </div>
    )
};
export default Signup;