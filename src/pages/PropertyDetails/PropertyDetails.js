import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import PageLoading from '../../components/PageLoader'
import PageNotFound from '../../pages/PageNotFound'
import PropertiesService from '../../services/PropertiesServices'
import { FaBath, FaBed, FaToilet } from 'react-icons/fa'
import Global from '../../Global'

export default function PropertyDetails(props) {
	const { match, location } = props;
	const iconSize = 19
	const { uid, property_id } = match.params
	const [pageState, setPageState] = useState('loading')
	const [data, setData] = useState(location?.state || null);
	useEffect(async () => {
		if(data){
			return setPageState('done')
		}
		try {
			const res = await PropertiesService.getPropertyByUidAndID(property_id)
			console.log('RS --', res)
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
	}, [])

	if (pageState === 'loading') {
		return <PageLoading />
	} else if (pageState === 'not found') {
		return <PageNotFound />
	} else if (data && pageState !== 'loading') {
		return (
			<Layout>
				<div className="row justify-content-center">
					<div className="col-xl-8 col-xxl-9 col-lg-8">
						<div className="card d-block mt-4 border-0 shadow-xss bg-white ">
							<div
								className="card-header d-flex justify-content-center text-center align-items-center"
								style={{
									backgroundImage: `url(${data.image_urls[0]})`,
									height: '200px',
									backgroundRepeat: 'no-repeat',
									backgroundSize: '100%',
									backgroundPosition: 'center',
								}}
							>
								<button className="btn bg-accent p-2 w-50 rounded shadow text-white">
									View All Images
								</button>
							</div>
							<div className="card-body">
								<span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-theme shadow d-inline-block text-white ">
									Featured
								</span>
								<span className="font-xsssss live-tag mt-2 bottom-0 mb-4 bg-accent ml-3 ps-3 pe-3 p-2 rounded-3 text-white text-uppersace fw-700 ls-3">
									{data?.location_keyword?.name}
								</span>
								<p className="review-link font-xsss fw-600 text-grey-500 lh-3 mb-0 mt-4">
									<i className="ti-location-pin mr-2"></i>
									{data?.location}
								</p>
								<h2 className="fw-700 font-lg mt-3 mb-2 text-grey-700">
									{data.name}
								</h2>
								<p className="font-xsss fw-500 text-grey-500 lh-30 pe-5 mt-3 me-5">
									{data.description}
								</p>
								<h2 className="fw-700 font-lg mt-3 mb-2 text-grey-700">
									{Global?.currency}
									{window.formatedPrice.format(data.price)}{' '}
									<span className="font-xss text-grey-500">
										/ {data.payment_type && data.payment_type.abbreviation}
									</span>{' '}
								</h2>
								<div className="clearfix"></div>
								<div className="star d-block w-100 text-left mt-2"></div>

								<div className="clearfix"></div>
								<h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-4">
									<i className="btn-round-sm bg-greylight text-grey-500 me-1">
										<FaBed size={iconSize} />
									</i>
									<b>{data.bedroom}</b>
								</h5>
								<h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-4">
									<i className="btn-round-sm bg-greylight text-grey-500 me-1">
										<FaBath size={iconSize} />
									</i>
									<b>{data.bathroom}</b>
								</h5>
								<h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-4">
									<i className="btn-round-sm bg-greylight text-grey-500 me-1">
										<FaToilet size={iconSize} />
									</i>
									<b>{data.toilet}</b>
								</h5>
								<hr />
								<div>
									<h2 className="fw-700 text-grey-700">Amenities</h2>
									<div className="container-fluid pl-0">
										<div className="row">
											{data?.amenities?.map((val, i) => {
												return (
													<div className="col-md-3 col-5" key={`am-${i}`}>
														<h5 className="bg-grey badge mt-1 mb-3 d-inline-block font-xsss fw-600 text-grey-600 me-2">
															{/* <i class="btn-round-sm bg-greylight ti-ruler-pencil text-grey-500 me-1"></i>{' '} */}
															{val?.name}
														</h5>
													</div>
												)
											})}
										</div>
									</div>
								</div>
								{/* <div className="clearfix mb-5"></div> */}
								<hr className="mb-4" />
								<a
									href="#share"
									className="btn-round-lg ms-3 d-inline-block rounded-3 bg-greylight"
									onClick={() => {
										if (navigator.share) {
											navigator
												.share({
													title: data.name,
													url: window.location.pathname,
													text: data.description,
												})
												.catch((err) => Promise.reject(err))
										}
									}}
								>
									<i className="feather-share-2 font-sm text-grey-700"></i>
								</a>
								<a
									href="#"
									className="btn-round-lg ms-2 d-inline-block rounded-3 bg-theme"
								>
									<i className="feather-phone font-sm text-white"></i>{' '}
								</a>
								<a
									href="#"
									className="bg-accent border-0 text-white fw-600 text-uppercase font-xssss float-left rounded-3 d-inline-block mt-0 p-2 lh-34 text-center ls-3 w200"
								>
									BOOK INSPECTION
								</a>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	} else {
		return <PageNotFound />
	}
}
