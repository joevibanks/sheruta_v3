import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Global from '../../../Global'
import EachSocialRequest from '../EachSocialRequest'
import { getUser } from '../../../redux/strapi_actions/auth.actions'
import Heading from '../../Heading/Heading'
import { Dots } from 'react-activity'
import VerifiedBadge from '../../VerifiedBadge/VerifiedBadge'
import match from '../../../assets/img/match.jpeg'
import PostRequestAds from '../../Ads/RequestAds/PostRequestAds'
// import Layout from '../../Layout/Layout'
import { Redirect } from 'react-router'
import UserFeedCard from './UserFeedCard'
import SocialFeedsAds from './SocialFeedsAds'
import RecentUsersList from '../../RecentUsersList/RecentUsersList'
// import FreeRequestAds from "../../Ads/RequestAds/FeeRequestAds";
const Layout = React.lazy(() => import('../../Layout/Layout'))

export default (props) => {
	localStorage.setItem('after_login', '/feeds')
	const auth = useSelector((state) => state.auth)
	const view = useSelector((state) => state.view)
	const { personal_info } = view
	const dispatch = useDispatch()
	const [state, setState] = useState({
		properties: [],
		list: [],
	})
	const [filter, setFilter] = useState('all')

	useEffect(() => {
		if (auth.user) {
			dispatch(getUser())
		}
	}, [])

	useEffect(() => {
		if (state.list.length === 0) {
			const dev = process.env.NODE_ENV === 'development'
			axios(
				process.env.REACT_APP_API_URL +
					`/property-requests/?_limit=${
						dev ? '20' : '50'
					}&_start=0&_sort=created_at:DESC`
			)
				.then((res) => {
					setState({ ...state, list: res.data })
					// console.log('FEED -----', res.data)
					dispatch({
						type: 'SET_VIEW_STATE',
						payload: {
							feed: [],
						},
					})
					dispatch({
						type: 'SET_VIEW_STATE',
						payload: {
							feed: res.data,
						},
					})
				})
				.catch((err) => {})
		}
	}, [state, view.personal_info])

	if (!auth.user) {
		return <Redirect to="/login" />
	}

	// if (!view.personal_info) {
	// 	return null
	// }

	return (
		<div className="main-wrapper">
			<Layout currentPage="feeds" showMessages>
				<div className="container-fluid">
					<div className="row _feed-body">
						{!Global.isMobile && (
							<div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
								{/* <RecentUsers data={newUsers} /> */}
								<UserFeedCard />
							</div>
						)}
						<div
							className="col-xl-8 col-xxl-8 col-lg-8 pl-1 pr-1"
							style={{
								paddingLeft: Global.isMobile ? 0 : 2,
								paddingRight: Global.isMobile ? 0 : 2,
							}}
						>
							<div className="card shadow-sm rounded-xxl border-0 mb-3 mt-3">
								<div className="card-body d-block w-100 shadow-none mb-0 p-0 ">
									<ul
										className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
										id="pills-tab"
										role="tablist"
									>
										<li className="active list-inline-item me-5">
											<a
												className={`fw-700 font-xssss text-grey-500 pt-3 pb-2 ls-1 d-inline-block ${
													filter === 'all' && 'active'
												}`}
												data-toggle="tab"
												onClick={() => setFilter('all')}
											>
												All
											</a>
										</li>
										<li className="list-inline-item me-5">
											<a
												className={`fw-700 font-xssss text-grey-500 pt-3 pb-2 ls-1 d-inline-block ${
													filter === 'for you' && 'active'
												}`}
												data-toggle="tab"
												onClick={() => setFilter('for you')}
											>
												For You
											</a>
										</li>
									</ul>
								</div>
							</div>
							

							{filter === 'all' && (
								<>
									{(view['feed'] ? view['feed'] : state.list).map((val, i) => {
										if(i === 2 ){
											return (
												<>
													<h5 className="fw-700 text-grey-600 mb-1 ml-2 mt-4">Recent Users</h5>
													{personal_info && <RecentUsersList />}
												</>
											)
										}
										return (
											<>
												<SocialFeedsAds index={i} key={`ad-${i}`} />
												<EachSocialRequest key={i + ' request'} data={val} />
											</>
										)
									})}
								</>
							)}
							{filter === 'for you' && (
								<>
									{(view['feed'] ? view['feed'] : state.list)
										.filter((x) => x.is_searching == !personal_info.looking_for)
										.map((val, i) => {
											return (
												<>
													<SocialFeedsAds index={i} key={`ad-${i}`} />
													<EachSocialRequest key={i + ' request'} data={val} />
												</>
											)
										})}
								</>
							)}
							{state.list.length === 0 ? (
								<div className="central-meta item rounded border-gray text-center d-flex justify-content-center mt-5 pt-5">
									<Dots />
								</div>
							) : null}
						</div>
					</div>
				</div>
			</Layout>
		</div>
	)
}
