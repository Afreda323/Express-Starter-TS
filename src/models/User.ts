import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: String,
  },
  { timestamps: true },
)

const user = model('user', userSchema)

export default user
