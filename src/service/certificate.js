const pdfmake = require("pdfmake");
const path = require("path");
const upload = require("../middleware/upload");
const { updateCloudanrt } = require("./cloudnary");
const fs = require('fs')

const fonts = {
    Roboto: {
        normal: './public/fonts/Roboto-Regular.ttf',
        bold: './public/fonts/Roboto-Medium.ttf',
        italics: './public/fonts/Roboto-Italic.ttf',
        bolditalics: './public/fonts/Roboto-MediumItalic.ttf'
    }
};

pdfmake.addFonts(fonts);

const createCertificate = async ({
    username,
    courseName,
    grade,
    issue_date
}) => {

    const docDefinition = {

        pageSize: "A4",
        pageMargins: [0, 0, 0, 0],

        background: [
            {
                image: "./public/certificate/bg.png",
                width: 595,
                height: 842
            }
        ],

        content: [

            // CERTIFICATE TITLE
            {
                text: "CERTIFICATE",
                absolutePosition: { x: 180, y: 120 },
                fontSize: 28,
                bold: true,
                color: "white"
            },

            {
                text: "OF COMPLETION",
                absolutePosition: { x: 220, y: 160 },
                fontSize: 16,
                color: "white"
            },

            // PRESENTED TO
            {
                text: "PROUDLY PRESENTED TO",
                absolutePosition: { x: 200, y: 260 },
                fontSize: 14,
                color: "white"
            },

            // USER NAME
            {
                text: username,
                absolutePosition: { x: 130, y: 320 },
                fontSize: 34,
                italics: true,
                bold: true,
                color: "white"
            },

            // COURSE NAME
            {
                text: `Successfully completed ${courseName}`,
                absolutePosition: { x: 120, y: 410 },
                fontSize: 18,
                color: "white"
            },

            // GRADE
            {
                text: `Grade : ${grade}`,
                absolutePosition: { x: 120, y: 470 },
                fontSize: 18,
                bold: true,
                color: "#FFD700"
            },

            // DATE
            {
                text: `Date : ${issue_date}`,
                absolutePosition: { x: 120, y: 520 },
                fontSize: 16,
                color: "white"
            },

            // SIGNATURE
            {
                text: "Instructor Signature",
                absolutePosition: { x: 390, y: 700 },
                fontSize: 14,
                color: "white"
            }

        ]
    };

    const pdf = pdfmake.createPdf(docDefinition);

    const filePath = path.join(
        __dirname,
        `../temp/${Date.now()}.pdf`
    );

    // CREATE PDF
    await pdf.write(filePath);

    // UPLOAD TO CLOUDINARY
    const result = await updateCloudanrt(filePath, {
       
        resource_type: "raw",
         certificates
    });

    // DELETE LOCAL FILE
    fs.unlinkSync(filePath);

    // RETURN CLOUDINARY URL
    return result.secure_url;

};

module.exports = createCertificate;