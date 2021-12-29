import Mongoose from 'mongoose'

const schema = new Mongoose.Schema({}, { strict: false, timestamps: true })

export default Mongoose.models.Event || Mongoose.model('Event', schema)
