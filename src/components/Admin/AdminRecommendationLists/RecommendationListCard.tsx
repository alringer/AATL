import Image from 'components/Image/Image'
import flow from 'lodash/flow'
import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import {
    AdminRecommendationListsActionClickableText,
    AdminRecommendationListsActionsColumn,
    AdminRecommendationListsClickableText,
    AdminRecommendationListsImageColumn,
    AdminRecommendationListsRecommendationsColumn,
    AdminRecommendationListsSubTitleColumn,
    AdminRecommendationListsTableRow,
    AdminRecommendationListsTitleColumn,
} from './AdminRecommendationLists.style'

// export interface IRecommendationListCardProps {
//     recommendationCard: IRecommendationList
//     index: number
//     moveCard: (dragIndex: number, hoverIndex: number) => void
// }

interface DragItem {
    index: number
    id: string
    type: string
}

const RecommendationListCard = ({
    index,
    list,
    moveCard,
    card,
    isDragging,
    connectDragSource,
    connectDropTarget,
    featured,
}) => {
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
        connectDropTarget(
            <div>
                <AdminRecommendationListsTableRow>
                    <AdminRecommendationListsImageColumn>
                        <Image src={list.imgSrc} alt="image" />
                    </AdminRecommendationListsImageColumn>
                    <AdminRecommendationListsTitleColumn>
                        <AdminRecommendationListsClickableText>{list.title}</AdminRecommendationListsClickableText>
                    </AdminRecommendationListsTitleColumn>
                    <AdminRecommendationListsSubTitleColumn>{list.subTitle}</AdminRecommendationListsSubTitleColumn>
                    <AdminRecommendationListsRecommendationsColumn>
                        {list.recommendations}
                    </AdminRecommendationListsRecommendationsColumn>
                    <AdminRecommendationListsActionsColumn>
                        <AdminRecommendationListsActionClickableText>
                            {featured ? "Don't feature" : 'Feature'}
                        </AdminRecommendationListsActionClickableText>
                    </AdminRecommendationListsActionsColumn>
                </AdminRecommendationListsTableRow>
            </div>
        )
    )
}

const cardSource = {
    beginDrag(props) {
        console.log('In the beginDrag: ', props)
        return {
            index: props.index,
            listId: props.list.id,
            list: props.list,
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()
        console.log('In the endDrag: ', props)

        if (dropResult && dropResult.listId !== item.listId) {
            props.removeCard(item.index)
        }
    },
}

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index
        const sourceListId = monitor.getItem().listId

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }
        if (findDOMNode(component)) {
            // Determine rectangle on screen
            const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
        }

        // Time to actually perform the action
        if (props.listId === sourceListId) {
            console.log('Props in the hover: ', props)
            props.moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex
        }
    },
}

export default flow(
    DropTarget('CARD', cardTarget, (connect) => ({
        connectDropTarget: connect.dropTarget(),
    })),
    DragSource('CARD', cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))
)(RecommendationListCard)