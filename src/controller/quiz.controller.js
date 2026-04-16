const quizModel = require("../model/quiz.model");


const getQuiz = async (req, res) => {


}

const getAllQuiz = async (req, res) => {
    // console.log('terms Routes');
    try {
        const quiz = await quizModel.find()

        console.log(quiz);

        res.status(200).json({ sucess: true, data: quiz, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll quiz error' + error.message })
    }

}

const addQuiz = async (req, res) => {
    try {
        console.log("req.body", req.body);

        const quiz = await quizModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "quiz added successfully",
            data: quiz
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add quiz error' + error.message
        });
    }
};

const updateQuiz = async (req, res) => {
    try {
        console.log("id:", req.params.id);
        console.log("body:", req.body);

        const quizData = await quizModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );


        if (!quizData) {

            return res.status(404).json({ data: null, message: 'quiz not updated' });
        }

        res.status(200).json({
            success: true,
            message: "quiz update successfully",
            data: quizData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update quiz error ' + error.message
        });
    }
}

const deleteQuiz = async (req, res) => {
    try {
        console.log("id:", req.params.id);


        const quizData = await quizModel.findByIdAndDelete(req.params.id)

        if (!quizData) {

            return res.status(404).json({ data: null, message: 'quiz not deleted' });
        }
        res.status(200).json({
            success: true,
            message: "quiz delete successfully",
            data: null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'delete Section  Internal Server Error ' + error.message
        });
    }

}


module.exports = {
    getQuiz,
    getAllQuiz,
    addQuiz,
    updateQuiz,
    deleteQuiz
}

