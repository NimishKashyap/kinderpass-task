import mongoose from "mongoose";

interface EmployeeAttrs {
  empId: string;
  firstname: string;
  lastname: string;
  address: string;
  mobile: number;
  city: string;
}
// Interface that describes properties
// that a user model has

interface EmployeeModel extends mongoose.Model<EmployeeDoc> {
  build(attrs: EmployeeAttrs): EmployeeDoc;
}

// Interface that describes properties
// that a user document has
interface EmployeeDoc extends mongoose.Document {
  empId: string;
  firstname: string;
  lastname: string;
  address: string;
  mobile: number;
  city: string;
}
const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      unique: true,
    },
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
    mobile: {
      type: Number,
      required: true,
    },
    city: {
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

employeeSchema.statics.build = (attrs: EmployeeAttrs) => {
  return new Employee(attrs);
};
const Employee = mongoose.model<EmployeeDoc, EmployeeModel>(
  "Employee",
  employeeSchema
);

export { Employee };
