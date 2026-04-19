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

      },

      options: [
        {
          type: String,

        }
      ],

      Answer: {
        type: String,

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