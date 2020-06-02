import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    }
});

const messageModel = mongoose.model('message', messageSchema);

export default messageModel;