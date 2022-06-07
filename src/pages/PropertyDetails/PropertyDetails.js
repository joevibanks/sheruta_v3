import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import PageLoading from '../../components/PageLoader'
import PageNotFound from '../../pages/PageNotFound'
import PropertiesService from '../../services/PropertiesServices'
import Global from '../../Global'
import axios from 'axios'
import { useSelector } from 'react-redux'
import PropertyDetailsRight from './PropertyDetailsRight'
import SimilarProperties from './SimilarProperties'
import Sticky from 'react-sticky-el'
import PropertyDetailsLeft from './PropertyDetailsLeft'

export default function PropertyDetails(props) {
	localStorage.setItem('after_login', window.location.pathname)
	const { user } = useSelector((state) => state.auth)
	const { match, location } = props
	const iconSize = 19
	const { property_id } = match.params
	const [pageState, setPageState] = useState('loading')
	const [data, setData] = useState(location?.state || null)
	const [listLoading, setListLoading] = useState(false)

	useEffect(() => {
		if (location?.state) {
			setData(location?.state)
		}
	}, [location?.state])

	useEffect(async () => {
		if (data) {
			return setPageState('done')
		}
		try {
			const res = await PropertiesService.getPropertyByUidAndID(property_id, 3)
			if (res.data.length === 0) {
				setPageState('not found')
			} else {
				setData(res.data[0])
				setPageState('done')
			}
		} catch (error) {
			setPageState('not found')
			return Promise.reject(error)
		}
	}, [property_id])

	if (pageState === 'loading') {
		return <PageLoading />
	} else if (pageState === 'not found') {
		return <PageNotFound />
	} else if (data && pageState !== 'loading') {
		return (
			<Layout full_screen>
				<div className="property-details-area ptb-100">
					<div className={Global.isMobile ? '' : 'container'}>
						<div
							className="row pb-5"
							style={{ paddingTop: user ? '0vh' : '0' }}
						>
							<div className="col-sm-12 col-md-12 col-lg-8">
								<PropertyDetailsLeft data={data} done={(e) => setData(e)} />
							</div>
							{!Global.isMobile && (
								<div className="col-xl-4 col-xxl-3 col-lg-4 ps-0">
									<div className="widget-area">
										<Sticky
											stickyStyle={{
												zIndex: 10,
												marginTop: user ? '12vh': '1vh',
											}}
										>
											{/* <PropertyDetailsRight data={data} /> */}
											<SimilarProperties data={data} />
										</Sticky>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</Layout>
		)
	} else {
		return <PageNotFound />
	}
}
