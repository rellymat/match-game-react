import React, { Component } from 'react';
import TableHeader from './common/tableHeader';
import { getGames, deleteGame } from './../services/gameService';
import TableBody from './common/tableBody';


class GamesTable extends Component {
    state = {
        category: '',
        games: [],
        buttons: [
            {
                name: 'Edit',
                style: 'btn btn-primary'
            },
            {
                name: 'Delete',
                style: 'btn btn-danger'
            }
        ]
    }

    onDelete = async game => {
        const originalGames = this.state.games
        const id = this.state.games[parseInt(game) -1]._id
        const games = originalGames.filter(g => g._id !== id)
        this.setState({games}) 

        try {
            await deleteGame(id)
            if(games.length === 0 )
                this.props.history.replace('/games')
        } catch (error) {
            this.setState({games: originalGames})
        }
    }

    onEdit = game => {
        const id = this.state.games[parseInt(game) -1]._id
        this.props.history.push(`/games/${this.state.category}/${id}`)
    }


    async componentDidMount() {
        const category = this.props.match.params.category
        const { data } = await getGames(category)
        this.setState({ games: data ,
                        category})
    }

    selectFunction = (game, button) => {
        switch (button) {
            case 'Edit':
                this.onEdit(game.slice(-1))
                break;
            case 'Delete':
                this.onDelete(game.slice(-1))
                break;
            default:
                break;
        }
    }

    render() {
        const { games, buttons } = this.state
        return (
            <React.Fragment>
                <h1>{this.props.match.params.category}</h1>
                {games.map((game, index) =>
                    <table key={game._id} style={{ width: '70%' }} className="table center">
                        <TableHeader key={index} index={index} buttons={buttons} handleButton={this.selectFunction} input={"Game " + (index + 1)} />
                        <tbody><tr><th>Question</th><th>Answer</th><th></th></tr></tbody>
                        <TableBody game={game} />
                        <tbody><tr><th><br/></th></tr></tbody>
                    </table>
                )}
            </React.Fragment>
        );
    }
}

export default GamesTable;