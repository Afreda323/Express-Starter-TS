import { model, Schema, Document } from 'mongoose'
import { isEmail } from 'validator'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [isEmail, 'invalid email'],
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: (p: string) => p.length >= 6,
        message: 'Password must be at least 6 characters long.',
      },
    },
  },
  { timestamps: true },
)

userSchema.pre<IUser>('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  next()
})
userSchema.methods.comparePassword = function(pw: string) {
  return bcrypt.compare(pw, this.password)
}

const user = model<IUser>('user', userSchema)

export default user
