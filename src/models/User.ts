import { model, Schema, Document, Model } from 'mongoose'
import { isEmail } from 'validator'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

interface IUserWithMethods extends IUser {
  comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [isEmail, 'invalid email'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (p: string) => p.length >= 6,
        message: 'Password must be at least 6 characters long.',
      },
    },
  },
  { timestamps: true },
)

userSchema.pre<IUserWithMethods>('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  next()
})

userSchema.methods.comparePassword = function(pw: string) {
  return bcrypt.compare(pw, this.password)
}

const user: Model<IUserWithMethods> = model<IUserWithMethods>('user', userSchema)

export default user
