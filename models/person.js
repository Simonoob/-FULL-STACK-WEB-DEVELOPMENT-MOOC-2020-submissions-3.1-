const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useFindAndModify", false);

// eslint-disable-next-line no-undef
const password = process.env.MONGODB_PASSWORD;

const url = `mongodb+srv://fullstack:${password}@cluster0.jjehi.mongodb.net/phonebook?retryWrites=true&w=majority`;

console.log("connecting to", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

personSchema.plugin(uniqueValidator);

// eslint-disable-next-line no-unused-vars
const Person = mongoose.model("Person", personSchema);

module.exports = mongoose.model("Person", personSchema);
