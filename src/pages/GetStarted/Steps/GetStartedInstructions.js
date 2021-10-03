import React from "react";
import { Link, useHistory } from "react-router-dom";
import Btn from "../../../components/Btn/Btn";
import { notifyEmy } from "../../../utils/Sheruta";

export default function GetStartedInstructions(props) {
    // console.log(props)
    const history = useHistory();

    const handleAgree = () => {
        notifyEmy({
            heading: "Accepted the Get Started Agreement",
            status: "success",
            url: window.location.pathname,
        });
        props.setStep(props.step + 1);
    };

    const handleDisagree = () => {
        notifyEmy({
            heading: "Didn't accept the Get Started Agreement",
            status: "error",
            url: window.location.pathname,
        });
        history.push("/");
    };

    return (
        <div className="pb-4 container">
            <div className="text-center">
                <h2 className="">What You Should Know</h2>
                <h6 className="text-muted">
                    For a secure flat share community, we require some
                    information about you.
                </h6>
            </div>
            <hr />
            <ol>
                <li>
                    National Identification Number.{" "}
                    <b className="text-danger">
                        This won't be shared to anyone
                    </b>
                </li>
                <li>A recent photo of yourself. (profile picture)</li>
                <li>Work information (supervisor's name, company etc)</li>
                <li>
                    Links to your social media account.{" "}
                    <b className="text-danger">You chose who can see this</b>
                </li>
            </ol>
            <div className="text-center">
                <h6>If you are okay with this click agree.</h6>
            </div>
            <hr />
            <div className="row justify-content-around">
                <Btn id="agree-btn" text="Agree" onClick={handleAgree} />
                <Btn
                    id="cancel-btn"
                    text="Cancel"
                    danger
                    onClick={handleDisagree}
                />
            </div>
        </div>
    );
}