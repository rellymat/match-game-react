import React, { Component } from 'react';
import TableHeader from './common/tableHeader';
import { getCategoriesGuest } from '../services/gameService'



class PlayGeneral extends Component {
    state = { 
        categories: [],
        buttons: [
            {
                name: 'Play',
                style: 'btn btn-primary'
            }
        ],
    }

    async componentDidMount() {
        const { data } = await getCategoriesGuest()
        this.setState({ categories: data })
    }

    onPlay = category => {
        this.props.history.push(`/board/admin/${category}`)
    }

    onInvite = category => {
        this.props.history.push(`/invite/${category}`)
    }

    selectFunction = (category, button) => {
        switch (button) {
            
            case 'Play':
                this.onPlay(category)
                break;
            default:
                break;
        }
    }


    render() {
        const { categories, buttons } = this.state
        const style = this.props.windowWidth > 768 ? {'width': '25%'} : {}
        const className = this.props.windowWidth > 768 ? "table center" : "table"
        
        return (
            <React.Fragment>
                <h1>Categories</h1>
                <table style={style} className={className}>
                    {categories.map((category, index) =>
                            <TableHeader key={index} index={index} buttons={buttons} handleButton={this.selectFunction} input={category} />
                    )}
                </table>
            </React.Fragment>
        );
    }
}

export default PlayGeneral;