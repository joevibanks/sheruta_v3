import React from 'react'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function EachGroupConversation({
	active,
	clickURL,
	name,
	image_url,
	last_seen,
}) {
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user

	return (
		<Link
			to={clickURL}
			className={`p-2 border-bottom w-100 list-group-item list-group-item-action ${
				active ? 'bg-theme-light border-1 border-success' : 'bg-white'
			}`}
		>
			<div className="d-flex justify-content-between">
				<div className="d-flex align-items-center">
					<div>
						<div
							className={_user?.is_online ? 'bg-danger' : 'bg-success'}
							style={{ borderRadius: '50px', padding: 3 }}
						>
							<Avatar src={image_url} size={60} className="m-0" />
						</div>
					</div>
					<div className="pl-2">
						<h4>{name}</h4>
						<small className="text-muted">
							<i>
								{`Lorem ipsum dolor sit amet consectetur adip`.slice(0, 20)}...
							</i>
						</small>
					</div>
				</div>
				<div
					style={{ flexDirection: 'column' }}
					className="d-flex justify-content-between"
				>
					<small>
						<i>{last_seen}</i>
					</small>
					<small className="bg-danger text-white align-self-end rounded-xxl pl-1 pr-1">
						43
					</small>
				</div>
			</div>
		</Link>
	)
}
