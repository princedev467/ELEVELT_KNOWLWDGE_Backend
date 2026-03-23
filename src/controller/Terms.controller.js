const fs = require('fs');
const path = require('path');
const pool = require('../db/MySql2');

const getTerms = async (req, res) => {


}

const getAllTerms = async (req, res) => {
    console.log('terms Routes');
    try {
        const [rows] = await pool.query('SELECT * FROM terms')

        console.log(rows);

        res.status(200).json({ sucess: true, data: rows, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll terms error' + error.message })
    }

}

const addTerms = async (req, res) => {
    try {
        const { name, description } = req.body
        console.log("req.body", req.body);

        const [rows] = await pool.query('INSERT INTO terms(name, description) VALUES (?, ?)', [name, description])


        const [result]=await pool.query(`SELECT * FROM terms WHERE id=${rows.insertId}`);

        res.status(200).json({
            success: true,
            message: "Terms added successfully",
            data: result[0]
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'addTerms error' + error.message
        });
    }
};

const updateTerms = async (req, res) => {
   try {
        console.log("id:", req.params.id);
         const { name, description } = req.body


        const [rows] = await pool.query('UPDATE terms SET name=?,description=? WHERE terms.id = ?', [name,description,req.params.id,])

        const [result]=await pool.query(`SELECT * FROM terms WHERE id=${rows.insertId}`);

        res.status(200).json({
            success: true,
            message: "Terms update successfully",
            data: result[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update Terms error' + error.message
        });
    }


}

const deleteTerms = async (req, res) => {
    try {
        console.log("id:", req.params.id);

        const [rows] = await pool.query('DELETE FROM terms WHERE terms.id = ?', [req.params.id])

          const [result]=await pool.query(`SELECT * FROM terms WHERE id=${rows.insertId}`);

        res.status(200).json({  
            success: true,
            message: "Terms delete successfully",
            data:null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'deleteTerms error' + error.message
        });
    }

}


module.exports = {
    addTerms,
    getTerms,
    getAllTerms,
    updateTerms,
    deleteTerms
}

