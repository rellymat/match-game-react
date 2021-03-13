import React, { Component } from 'react';
import '../styles/board.css';
import Message from './message';
import Button from './common/button';
import Timer from './common/timer';
import Life from './common/life';
import Header from './common/header';
import BadgeRow from './common/badgeRow';
import { getArray, getTitle, isDbEmpty, getCurrentGame, getCurrentTitle } from '../services/gameService';
import { getNext } from './../services/gameService';
import { toast } from 'react-toastify';
import wrongAudio from '../sounds/wrong.wav'
import successAudio from '../sounds/success.wav'
import selectAudio from '../sounds/select.wav'


class Board extends Component {
    constructor() {
        super()
        this.state = {
            rows_badges: [],
            solvePress: false,
            solveArray: new Array(4).fill().map(f => f = false),
            messageOn: false,
            timer: 30,
            lives: 3,
            title: '',
            buttonsMessage: [
                { name: 'Try Again' },
                { name: 'Next Game' }
            ],
            buttonsEnd: [
                { name: 'Start Over' },
                { name: 'Back to menu' }
            ]
        };


    }

    sounds = {
        wrong: new Audio(wrongAudio),
        success: new Audio(successAudio),
        select: new Audio(selectAudio)
    }

    selectFunction = (name) => {
        switch (name) {
            case "Try Again":
                this.handleTryAgain()
                break;
            case "Next Game":
                this.next()
                break;
            case "Start Over":
                this.startOver()
                break;
            case "Back to menu":
                this.props.history.push('/')
                break;
            default:
                break;
        }
    }

    next = async () => {
        const rb = await getNext()
        if (rb !== null) {
            this.setState({
                rows_badges: rb,
                badgeSelected: null,
                solvePress: false,
                solveArray: new Array(4).fill().map(f => f = false),
                messageOn: false,
                timer: 30,
                lives: 3,
                title: getCurrentTitle()
            })
            this.createInterval()
        } else {
            this.setState({ lives: 0})
        }
    }

    handleTryAgain = async () => {
        this.setState({
            rows_badges: await getCurrentGame(),
            badgeSelected: null,
            solvePress: false,
            solveArray: new Array(4).fill().map(f => f = false),
            messageOn: false,
            timer: 30,
            lives: 3,
            title: getCurrentTitle()
        })
        this.createInterval()
    }

    isEmpty = () => {
        const { lives, timer } = this.state
        return isDbEmpty() && (lives === 0 || timer === 0)
    }

    async componentDidMount() {
        const { user, category } = this.props.match.params
        try {
            const rows_badges = await getArray(category, user)
            const title = getTitle()
            this.setState({
                rows_badges,
                title
            })
            this.createInterval()
        } catch (error) {
            toast.error("Fail load up data")
        }
        if (this.isEmpty())
            this.setState({ messageOn: true })
    }

    createInterval = () => {
        return this.myInterval = setInterval(() => {
            if (this.state.timer === 0) {
                this.setState({ messageOn: true })
                clearInterval(this.myInterval)
            } else {
                this.setState(prevState => ({
                    timer: prevState.timer - 1
                }))
            }
        }, 1000)
    }

    isAllCorrect = () => {
        return this.state.solveArray.indexOf(false) === -1
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    setFalseSolve = () => {
        this.setState({ solvePress: false })
    }

    showCheck = (index) => {
        if (index !== 4) {
            if (this.state.solveArray[index])
                return <p className="check">&#10003;</p>
            return <p className="check mistake">&#10007;</p>
        }
    }

    handleCheck = () => {
        if (this.state.messageOn) {
            return
        }

        this.setState({
            solvePress: true
        })

        this.state.rows_badges.slice(0, 4).map((arr, index) => {
            if (arr[0].matchID === arr[1].id) {
                this.state.solveArray[index] = true
            } else {
                this.state.solveArray[index] = false
            }
        })

        if (this.isAllCorrect()) {
            this.sounds.success.play()
            clearInterval(this.myInterval)
            this.setState({ messageOn: true })
        } else {
            this.sounds.wrong.play()
            this.setState(prevState => ({ lives: prevState.lives - 1 }))
            if (this.state.lives === 1) {
                clearInterval(this.myInterval)
                this.setState({ messageOn: true })
            }
        }
    }

    startOver = async () => {
        const { user, category } = this.props.match.params
        this.setState({
            rows_badges: await getArray(category, user),
            badgeSelected: null,
            solvePress: false,
            solveArray: new Array(4).fill().map(f => f = false),
            messageOn: false,
            timer: 30,
            lives: 3,
            title: getTitle()
        })
        this.createInterval()
    }

    handleClick = badge => {
        this.setFalseSolve()
        if (this.isChange(badge)) {
            if (this.state.badgeSelected) {
                this.swapBadges(this.state.badgeSelected, badge)
            } else {
                this.sounds.select.play()
                badge.selected = true
                this.setState({
                    badgeSelected: badge
                })
            }
        }
    }


    isChange = badge => {
        if (badge.change)
            return true
        return false
    }

    swapBadges = (first, second) => {
        let arrayFirst = this.findArray(first)
        let arraySecond = this.findArray(second)
        if (arrayFirst !== arraySecond && first.text !== second.text) {
            this.state.badgeSelected.selected = false
            this.swap(arrayFirst, arraySecond, first, second)
            this.setState({
                badgeSelected: null
            })
        } else {
            first.selected = false
            second.selected = true
            this.setState({
                badgeSelected: second
            })
        }
    }

    findArray = (badge) => {
        return this.state.rows_badges.find((arr) =>
            (arr.indexOf(badge) !== -1))
    }

    swap = (arrayFirst, arraySecond, badgeFirst, badgeSecond) => {
        let temp = arrayFirst[arrayFirst.indexOf(badgeFirst)]
        arrayFirst[arrayFirst.indexOf(badgeFirst)] = arraySecond[arraySecond.indexOf(badgeSecond)]
        arraySecond[arraySecond.indexOf(badgeSecond)] = temp
    }

    render() {
        const { rows_badges, solvePress, messageOn, timer, lives, title, buttonsMessage, buttonsEnd } = this.state
        const { windowWidth } = this.props
        return (
            <>
                <Header title={title} windowWidth={windowWidth}/>
                <div className="container">
                    <br /><br />
                    <BadgeRow
                        rows_badges={rows_badges}
                        solvePress={solvePress}
                        messageOn={messageOn}
                        handleClick={this.handleClick}
                        showCheck={this.showCheck}
                        windowWidth={windowWidth}
                    />
                    {!this.isEmpty() && messageOn && <Message handleButton={this.selectFunction} buttons={buttonsMessage} message={this.isAllCorrect() ? "Success!" : "Failed!"} />}
                    {this.isEmpty() && <Message handleButton={this.selectFunction} buttons={buttonsEnd} message='Game Over!' />}
                    <Button handleButton={this.handleCheck} text={"check"} />
                    <Timer timer={timer} />
                    <Life lives={lives} />
                </div>
            </>);
    }
}

export default Board;