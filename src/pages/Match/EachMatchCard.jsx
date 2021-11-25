import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Btn from "../../components/Btn/Btn";
import VerifiedBadge from "../../components/VerifiedBadge/VerifiedBadge";
import { FiCheck } from "react-icons/fi";
import { MdClose, MdWork } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { FaIndustry } from "react-icons/fa";
import axios from "axios";
import PersonalInfo from "../Profile/PersonalInfo";
import { Modal } from "react-bootstrap";

const Wrapper = styled.div`
    .actions > div > button {
        border: none;
        /* background-color: pink; */
        height: 4em;
        width: 4em;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .actions > div {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
`;

export default function EachMatchCard({ data, handleStatusUpdate }) {
    const { users_permissions_user, personal_info } = data;
    // console.log("DATA --", data);
    const { user } = useSelector((state) => state.auth);
    const { work_industries } = useSelector((state) => state.view);
    const [showInfo, setShowInfo] = useState(false);

    return (
			<Wrapper className="friend-box rounded border-gray">
				<Modal show={showInfo} size="lg" onHide={() => setShowInfo(false)}>
					<PersonalInfo userData={users_permissions_user} />
				</Modal>
				<div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
					<img
						alt=""
						src={users_permissions_user.avatar_url}
						width="90"
						style={{ zIndex: 100 }}
						className="shadow"
					/>
					<div className="frnd-name">
						<div className="d-flex">
							<Link
								title=""
								to={`/user/${users_permissions_user.username}`}
								className="text-theme"
							>
								{users_permissions_user.first_name}{' '}
								{users_permissions_user.last_name}
							</Link>
							<VerifiedBadge
								user={users_permissions_user}
								without_text
								className="ml-2"
							/>
						</div>
						<span>@{users_permissions_user.username}</span> <br />
						<Link to={`/user/${users_permissions_user.username}`}>
							<Btn
								className="main-btn2 mt-2 btn-sm"
								text="View Profile"
								onClick={() => {}}
							/>
						</Link>
					</div>
				</div>

				<ul className="menu-list pt-5">
					<li>
						<a href="#gender" title="" data-ripple="">
							<i className="fa fa-fire"></i>
							{personal_info.gender === 'm' ? 'Male' : 'Female'}
						</a>
					</li>
					<li>
						<a href="#profession" title="" data-ripple="">
							<i>
								<MdWork />
							</i>
							{personal_info.occupation}
						</a>
					</li>
					{personal_info.work_industry ? (
						<li>
							<a href="#work-industry" title="" data-ripple="">
								<i>
									<FaIndustry />
								</i>
								{work_industries.length > 0 &&
									work_industries.filter(
										(x) => x.id === personal_info.work_industry
									)[0].name}
							</a>
						</li>
					) : null}
				</ul>
				<div className="row justify-content-center">
					<div
						className="mt-3 text-center col-6 btn p-0"
						onClick={() => {
							setShowInfo(true)
						}}
					>
						<BiLockAlt size={50} />
						<br />
						<small>View More Information</small>
					</div>
				</div>
				<hr />
				<div className="p-3 actions d-flex justify-content-around">
					<div>
						<button
							className="btn-danger"
							onClick={() => handleStatusUpdate(data.id, 'rejected')}
						>
							<MdClose size={40} />
						</button>
						<small>Reject</small>
					</div>
					<div>
						<button
							className="bg-theme text-white"
							onClick={() => handleStatusUpdate(data.id, 'accepted')}
						>
							<FiCheck size={40} />
						</button>
						<small>Accept</small>
					</div>
				</div>
			</Wrapper>
		)
}
