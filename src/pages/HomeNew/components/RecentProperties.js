import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import EachDemoProperty from '../../../components/New/EachDemoProperty'
import { Link } from 'react-router-dom'
import Global from '../../../Global'

export default function RecentProperties() {
	const [list, setList] = useState([])

	const getRecentProperties = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/properties?&_limit=10`
			)
			setList(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getRecentProperties()
	}, [getRecentProperties])

	return (
		<div className="featured-area ptb-100">
			<div className="container">
				<div className="section-title">
					<h3>Our Featured Flats</h3>
					<p>
						We take our time to find flat for share for our users on demand, register today and join the community.
					</p>
				</div>
				<div className="d-flex" style={{ overflowX: 'scroll' }}>
					{list.map((val, i) => {
						return (
							<div
								className={`"col-sm-12 col-md-6 col-lg-4 ${
									Global.isMobile ? 'mr-0 pl-0' : 'mr-4'
								}`}
								// style={{ width: '40rem' }}
								key={`prop-${i}`}
							>
								<EachDemoProperty data={val} />
							</div>
						)
					})}
				</div>
				<div className="view-featured-btn">
					<Link to="/flats" className="default-btn text-white">
						VIEW MORE ROOMS
						{/* <span style="top: -46.0938px; left: 267.734px;"></span> */}
					</Link>
				</div>
			</div>
		</div>
	)
}
