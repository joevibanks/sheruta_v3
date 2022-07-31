import React, { useState } from 'react'
import EachGroupConversation from './EachGroupConversation'
import DiscussionLeftHeader from './DiscussionLeftHeader'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useParams } from 'react-router'

export default function DiscussionLeft() {
	const { location_keywords } = useSelector((state) => state.view)
	const { room_id } = useParams()

	const [list] = useState(location_keywords.filter((x) => x.has_group))

	return (
		<div className="pl-2 bg-grey-300">
			<DiscussionLeftHeader />
			<div className="list-group scroll-bar" style={{ maxHeight: '81vh' }}>
				{list?.map((val, i) => {
					return (
						<EachGroupConversation
							active={room_id == val.id}
							key={`location-group-${i}`}
							name={val?.name}
							image_url={val?.background_img}
							clickURL={`/discussion/room/${val?.id}`}
							last_seen={
								moment(val.created_at).fromNow().includes('seconds')
									? 'just now'
									: moment(val.created_at).fromNow()
							}
						/>
					)
				})}
			</div>
		</div>
	)
}
