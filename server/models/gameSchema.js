import mongoose from 'mongoose';

const createSchema = mongoose.Schema({
    owner: String,
    category: String,
    items_1: [String],
    items_2: [String],
    items_3: [String],
    items_4: [String],
})

const CreateGameModel = mongoose.model('Games', createSchema)

export default CreateGameModel;