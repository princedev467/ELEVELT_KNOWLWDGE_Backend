const { default: mongoose } = require("mongoose");

const quizContentSchema = new mongoose.Schema(
    {
     quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz',
    required: true
  },

  question: {
    type: String,
    required: true
  },

  options: [
    {
      type: String,
      required: true
    }
  ],

  correctAnswer: {
    type: String,
    required: true
  },        
     isActive: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const quizContentModel = mongoose.model('quizContents', quizContentSchema);
module.exports = quizContentModel  