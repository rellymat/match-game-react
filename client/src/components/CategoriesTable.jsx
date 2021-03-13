import React, { Component } from 'react';
import TableHeader from './common/tableHeader';
import { deleteCategory, getCategories } from '../services/gameService'
import Button from './common/button';
import { getCurrentUser } from './../services/auth';


class CategoriesTable extends Component {
    state = {
        createOn: false,
        inputValue: '',
        error: '',
        categories: [],
        buttons: [
            {
                name: 'Edit',
                style: 'btn btn-primary'
            },
            {
                name: 'Delete',
                style: 'btn btn-danger'
            },
            {
                name: 'Add',
                style: 'btn btn-info'
            },
            {
                name: 'Play',
                style: 'btn btn-warning'
            },
            {
                name: 'Invite',
                style: 'btn btn-success'
            }
        ]
    }

    onDelete = async category => {
        const originalCategories = this.state.categories
        const categories = originalCategories.filter(c => c !== category)
        this.setState({ categories })

        try {
            await deleteCategory(category)
        } catch (error) {
            this.setState({ categories: originalCategories })
        }
    }

    onEdit = category => {
        const link = '/games/' + category
        this.props.history.push(link)
    }

    onAdd = category => {
        this.props.history.push(`/games/${category}/new`)
    }

    newCategories = () => {
        this.setState({ createOn: !this.state.createOn })
    }

    async componentDidMount() {
        const { data } = await getCategories()
        this.setState({ categories: data })
    }

    onPlay = category => {
        const user = getCurrentUser().user
        this.props.history.push(`/board/${user}/${category}`)
    }

    onInvite = category => {
        this.props.history.push(`/invite/${category}`)
    }

    selectFunction = (category, button) => {
        switch (button) {
            case 'Edit':
                this.onEdit(category)
                break;
            case 'Delete':
                this.onDelete(category)
                break;
            case 'Add':
                this.onAdd(category)
                break;
            case 'Play':
                this.onPlay(category)
                break;
            case 'Invite':
                this.onInvite(category)
                break;
            default:
                break;
        }
    }

    createInput = () => {
        const { inputValue, error } = this.state
        return <div style={{ width: '40%' }} className="center">
            <input value={inputValue} onChange={this.handleChange} placeholder="Category" id="inputValue" className="form-control" />
            <Button text="Create Game" handleButton={this.onSubmit} />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    }

    onSubmit = () => {
        if (this.state.error) return
        this.props.history.push(`/games/${this.state.inputValue}/new`)
    }


    handleError = inputValue => {
        if (inputValue.length > 44) {
            this.setState({ error: "Category it's too long" })
            return
        }
        if (inputValue.length < 1) {
            this.setState({ error: "Category it's too short" })
            return
        }
        this.setState({ error: "" })
    }


    handleChange = ({ currentTarget: input }) => {
        const inputValue = input.value
        this.setState({ inputValue })
        this.handleError(inputValue)
    }

    render() {
        const { categories, buttons, createOn } = this.state
        const { windowWidth } = this.props
        const style = windowWidth > 768 ? {'width': '50%'} : {}
        const className = windowWidth > 768 ? "table center" : ""
        return (
            <React.Fragment>
                <h1>My Games</h1>
                <table style={style} className={className}>
                    {categories.map((category, index) =>
                            <TableHeader 
                            key={index}
                             index={index} 
                             buttons={buttons} 
                             handleButton={this.selectFunction} 
                             input={category} 
                             windowWidth={windowWidth}/>
                    )}
                </table>
                <div className="center">
                    {categories.length === 0 && <p className="center">Not have any games</p>}
                    <Button style="btn btn-secondary" text="Create new Game & Category!" handleButton={this.newCategories} />
                    {createOn && this.createInput()}
                </div>
            </React.Fragment>
        );
    }
}

export default CategoriesTable;