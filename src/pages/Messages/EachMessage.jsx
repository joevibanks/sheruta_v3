import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Global from "../../Global";

export default function EachMessage({ sent, message }) {
    const { user } = useSelector((state) => state.auth);
    return (
        <>
            {message.from.id === user.user.id ? (
                <li className="media reply">
                    <div className="media-body text-right ">
                        <div className="date_time">
                            {moment(message.created_at).fromNow()}
                        </div>
                        <div className="d-flex justify-content-end">
                            <p className="rounded border-gray shadow-sm">
                                {message.message_text}
                            </p>
                        </div>
                    </div>
                </li>
            ) : (
                <li className="media sent">
                    <span
                        className="contact-status busy"
                        style={{ left: Global.isMobile ? "35px" : "25px" }}
                    ></span>
                    <img
                        className="img-fluid align-self-start mr-3"
                        width="40"
                        src={message.from.avatar_url}
                        alt="s6.jpg"
                    />
                    <div className="media-body ">
                        <div className="date_time">
                            {moment(message.created_at).fromNow()}
                        </div>
                        <p className="rounded border-gray shadow-sm bg-white">
                            {message.message_text}
                        </p>
                    </div>
                </li>
            )}
        </>
    );
}
