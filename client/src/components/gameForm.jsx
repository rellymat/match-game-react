import "../styles/addForm.css";
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGameForm, addGame, getCategories } from '../services/gameService'


class GameForm extends Form {
    state = {
        data: {
            category: '',
            ques0: "",
            answer0: "",
            ques1: "",
            answer1: "",
            ques2: "",
            answer2: "",
            ques3: "",
            answer3: "",
        },
        errors: {}
    };

    schema = {
        id: Joi.string(),
        category: Joi.string()
            .required()
            .max(44),
        ques0: Joi.string()
            .required()
            .label("Question")
            .max(44),
        answer0: Joi.string()
            .required()
            .label("Answer")
            .max(44),
        ques1: Joi.string()
            .required()
            .label("Question")
            .max(44),
        answer1: Joi.string()
            .required()
            .label("Answer")
            .max(44),
        ques2: Joi.string()
            .required()
            .label("Question")
            .max(44),
        answer2: Joi.string()
            .required()
            .label("Answer")
            .max(44),
        ques3: Joi.string()
            .required()
            .label("Question")
            .max(44),
        answer3: Joi.string()
            .required()
            .label("Answer")
            .max(44)
    };

    async componentDidMount() {
        const data = {...this.state.data}
        data['category'] = this.props.match.params.category
        this.setState({ data })
        try {
            const {id} = this.props.match.params
            if (id !== 'new') {
                const { data: input } = await getGameForm(id)
                this.setGame(input)
            }
        }
            
        catch(error) {}


    }

    setGame = input => {
        const data = {
            id: input._id,
            category: input.category,
            ques0: input.items_1[0],
            answer0: input.items_1[1],
            ques1: input.items_2[0],
            answer1: input.items_2[1],
            ques2: input.items_3[0],
            answer2: input.items_3[1],
            ques3: input.items_4[0],
            answer3: input.items_4[1],
        }

        this.setState({ data })
    }

    doSubmit = async (e) => {
        try {
            const { data } = this.state
            await addGame(this.state.data)
            this.props.history.replace('/games')
        } catch (error) {

        }
    };

    checkDuplicate = (data, name) => {
        for (const key in data) {
            if (key !== name && data[key] === data[name])
                return "Not allowed duplicate"
        }
        return null
    }

    isDuplicate = () => {
        const { errors } = this.state
        for (const name in errors) {
            if (errors[name]) {
                return true
            }
        }
        return false
    }

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        const duplicate = this.isDuplicate()
        if (duplicate) {
            return this.state.errors
        }
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;

        if (!errorMessage) errors[input.name] = this.checkDuplicate(data, input.name)

        this.setState({ data, errors });
    };


    render() {
        const quesanswer = []
        for (let index = 0; index < 4; index++) {
            quesanswer.push(<div key={index} className="sameLine">
                {this.renderInput("ques" + index, "Question")}
                {this.renderInput("answer" + index, "Answer")}
            </div>)
        }

        return (<div>
            <h1>Game Form</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="center">
                    <br/>
                    <h4>Category: {this.state.data.category}</h4>
                </div>
                <br></br>
                {quesanswer}
                {this.renderButton("Save")}
            </form>
        </div>)
    }
}

export default GameForm;