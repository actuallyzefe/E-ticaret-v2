import mongoose from 'mongoose';
import { Password } from '../services/auth';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['seller', 'buyer'],
    },
    shopID: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// We are declaring a static method to userSchema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});
// model function overall is going to return
// something of type "UserModel"
// first argument is the schema of our document

// MONGOOSE TYPE
// export function model<T, U, TQueryHelpers = {}>(
//     name: string,
//     schema?: Schema<T, any, any, TQueryHelpers, any, any>,
//     collection?: string,
//     options?: CompileModelOptions
//   ): U;

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
