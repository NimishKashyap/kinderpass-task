import mongoose from "mongoose";
import { Password } from "../services/password";

// Interface for manager attributes
interface ManagerAttrs {
  firstname: string;
  lastname: string;
  address: string;
  dob: string;
  company: string;
  email: string;
  password: string;
}
// Interface that describes properties
// that a user model has

interface ManagerModel extends mongoose.Model<ManagerDoc> {
  build(attrs: ManagerAttrs): ManagerDoc;
}

// Interface that describes properties
// that a user document has
interface ManagerDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  address: string;
  dob: string;
  company: string;
  email: string;
  password: string;
}

// Actual mongoose schema
const managerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

// Added build method to enforce typechecking (both for tsc and vscode)
managerSchema.statics.build = (attrs: ManagerAttrs) => {
  return new Manager(attrs);
};

// Hashing of passwords
managerSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const Manager = mongoose.model<ManagerDoc, ManagerModel>(
  "Manager",
  managerSchema
);

export { Manager };
