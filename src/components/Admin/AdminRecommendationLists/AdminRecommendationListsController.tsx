import update from 'immutability-helper'
import React from 'react'
import { DropTarget } from 'react-dnd'
import { IRecommendationList } from './AdminRecommendationLists'
import {
    AdminRecommendationListsActionsColumn,
    AdminRecommendationListsImageColumn,
    AdminRecommendationListsRecommendationsColumn,
    AdminRecommendationListsSubTitleColumn,
    AdminRecommendationListsTableContainer,
    AdminRecommendationListsTableHeaderRow,
    AdminRecommendationListsTitleColumn,
} from './AdminRecommendationLists.style'
import RecommendationListCard from './RecommendationListCard'

interface IAdminRecommendationListsControllerProps {
    recommendationLists: IRecommendationList[]
}

class AdminRecommendationListsController extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = { lists: props.recommendationLists.lists }
    }

    pushCard(card: any) {
        this.setState(
            update(this.state, {
                lists: {
                    $push: [card],
                },
            })
        )
    }

    removeCard(index: any) {
        this.setState(
            update(this.state, {
                lists: {
                    $splice: [[index, 1]],
                },
            })
        )
    }

    moveCard(dragIndex: number, hoverIndex: number) {
        const lists = this.state.lists
        const dragCard = lists[dragIndex]
        this.setState(
            update(this.state, {
                lists: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                },
            })
        )
    }

    render() {
        const { lists } = this.state
        const { canDrop, isOver, connectDropTarget } = this.props
        return connectDropTarget(
            <div>
                <AdminRecommendationListsTableContainer id="">
                    <AdminRecommendationListsTableHeaderRow>
                        <AdminRecommendationListsImageColumn>Image</AdminRecommendationListsImageColumn>
                        <AdminRecommendationListsTitleColumn>Title</AdminRecommendationListsTitleColumn>
                        <AdminRecommendationListsSubTitleColumn>Subtitle</AdminRecommendationListsSubTitleColumn>
                        <AdminRecommendationListsRecommendationsColumn>
                            Recommendations
                        </AdminRecommendationListsRecommendationsColumn>
                        <AdminRecommendationListsActionsColumn>Actions</AdminRecommendationListsActionsColumn>
                    </AdminRecommendationListsTableHeaderRow>
                    {lists.map((list: IRecommendationList, index: number) => {
                        return (
                            <RecommendationListCard
                                list={list}
                                index={index}
                                removeCard={this.removeCard.bind(this)}
                                moveCard={this.moveCard.bind(this)}
                                key={index}
                                featured={this.props.recommendationLists.id === 0 ? true : false}
                            />
                        )
                    })}
                </AdminRecommendationListsTableContainer>
            </div>
        )
    }
}

const cardTarget = {
    drop(props, monitor, component) {
        const { id } = props.recommendationLists
        const sourceObj = monitor.getItem()
        console.log('Source Object: ', sourceObj)
        console.log('Props in the Drop: ', props)
        if (id !== sourceObj.listId) component.pushCard(sourceObj.list)
        return {
            listId: id,
        }
    },
}

export default DropTarget('CARD', cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(AdminRecommendationListsController)
