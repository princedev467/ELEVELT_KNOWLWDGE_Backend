const pdfmake = require("pdfmake");
const path = require("path");
const { updateCloudanrt } = require("./cloudnary");

const fonts = {
    Roboto: {
        normal: './public/fonts/Roboto-Regular.ttf',
        bold: './public/fonts/Roboto-Medium.ttf',
        italics: './public/fonts/Roboto-Italic.ttf',
        bolditalics: './public/fonts/Roboto-MediumItalic.ttf'
    }
};

pdfmake.addFonts(fonts);

const GOLD       = '#B8963E';
const GOLD_LIGHT = '#D4AF6A';
const DARK_BROWN = '#2C1F0A';
const MID_BROWN  = '#5A4A28';
const MUTED      = '#7A6040';
const LABEL      = '#9A7A3A';
const TITLE_GOLD = '#8A6820';
const BG         = '#FFFDF6';

const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Diamond divider spanning full content width (495pt)
const diamondDivider = (topMargin = 0, bottomMargin = 0) => ({
    canvas: [
        { type: 'line', x1: 0,   y1: 5, x2: 220, y2: 5, lineWidth: 0.5, lineColor: GOLD_LIGHT },
        { type: 'rect', x: 224,  y: 2,  w: 6, h: 6, color: GOLD, lineColor: GOLD },
        { type: 'line', x1: 234, y1: 5, x2: 455, y2: 5, lineWidth: 0.5, lineColor: GOLD_LIGHT },
    ],
    margin: [0, topMargin, 0, bottomMargin],
});

// Full-width thin gold rule
const goldRule = (topMargin = 0, bottomMargin = 0) => ({
    canvas: [
        { type: 'line', x1: 0, y1: 0, x2: 455, y2: 0, lineWidth: 0.5, lineColor: GOLD_LIGHT },
    ],
    margin: [0, topMargin, 0, bottomMargin],
});

const createCertificate = async ({ username, courseName, grade, issueDate }) => {

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [70, 60, 70, 60],

        background: (currentPage, pageSize) => ({
            canvas: [
                // Parchment fill
                { type: 'rect', x: 0, y: 0, w: pageSize.width, h: pageSize.height, color: BG },

                // Outer gold border
                { type: 'rect', x: 14, y: 14, w: pageSize.width - 28, h: pageSize.height - 28, lineWidth: 2, lineColor: GOLD, color: null },
                // Inner thin border
                { type: 'rect', x: 22, y: 22, w: pageSize.width - 44, h: pageSize.height - 44, lineWidth: 0.5, lineColor: GOLD_LIGHT, color: null },

                // Corner TL
                { type: 'line', x1: 14, y1: 56, x2: 56, y2: 56, lineWidth: 0.7, lineColor: GOLD_LIGHT },
                { type: 'line', x1: 56, y1: 14, x2: 56, y2: 56, lineWidth: 0.7, lineColor: GOLD_LIGHT },
                { type: 'ellipse', x: 56, y: 56, r1: 3, r2: 3, color: GOLD_LIGHT, lineColor: GOLD_LIGHT },
                // Corner TR
                { type: 'line', x1: pageSize.width - 14, y1: 56, x2: pageSize.width - 56, y2: 56, lineWidth: 0.7, lineColor: GOLD_LIGHT },
                { type: 'line', x1: pageSize.width - 56, y1: 14, x2: pageSize.width - 56, y2: 56, lineWidth: 0.7, lineColor: GOLD_LIGHT },
                { type: 'ellipse', x: pageSize.width - 56, y: 56, r1: 3, r2: 3, color: GOLD_LIGHT, lineColor: GOLD_LIGHT },
                // Corner BL
                { type: 'line', x1: 14, y1: pageSize.height - 56, x2: 56, y2: pageSize.height - 56, lineWidth: 0.7, lineColor: GOLD_LIGHT },
                { type: 'line', x1: 56, y1: pageSize.height - 14, x2: 56, y2: pageSize.height - 56, lineWidth: 0.7, lineColor: GOLD_LIGHT },
                { type: 'ellipse', x: 56, y: pageSize.height - 56, r1: 3, r2: 3, color: GOLD_LIGHT, lineColor: GOLD_LIGHT },
                // Corner BR
                { type: 'line', x1: pageSize.width - 14, y1: pageSize.height - 56, x2: pageSize.width - 56, y2: pageSize.height - 56, lineWidth: 0.7, lineColor: GOLD_LIGHT },
                { type: 'line', x1: pageSize.width - 56, y1: pageSize.height - 14, x2: pageSize.width - 56, y2: pageSize.height - 56, lineWidth: 0.7, lineColor: GOLD_LIGHT },
                { type: 'ellipse', x: pageSize.width - 56, y: pageSize.height - 56, r1: 3, r2: 3, color: GOLD_LIGHT, lineColor: GOLD_LIGHT },
            ]
        }),

        content: [

            // ── ORG NAME ──
            {
                text: 'ELEVELT KNOWLEDGE',
                alignment: 'center',
                fontSize: 8,
                bold: true,
                color: LABEL,
                characterSpacing: 4,
                margin: [0, 14, 0, 12],
            },

            diamondDivider(0, 12),

            // ── TITLE ──
            {
                text: 'Certificate',
                alignment: 'center',
                fontSize: 52,
                bold: true,
                color: TITLE_GOLD,
                margin: [0, 0, 0, 0],
            },
            {
                text: 'OF COMPLETION',
                alignment: 'center',
                fontSize: 9,
                color: LABEL,
                characterSpacing: 5,
                margin: [0, 2, 0, 12],
            },

            diamondDivider(0, 28),

            // ── CERTIFIES THAT ──
            {
                text: 'This certifies that',
                alignment: 'center',
                fontSize: 13,
                italics: true,
                color: MUTED,
                margin: [0, 0, 0, 8],
            },

            // ── RECIPIENT NAME ──
            {
                text: username,
                alignment: 'center',
                fontSize: 42,
                bold: true,
                color: DARK_BROWN,
                margin: [0, 0, 0, 8],
            },

            // Name underline
            goldRule(0, 20),

            // ── HAS COMPLETED ──
            {
                text: 'has successfully completed the course',
                alignment: 'center',
                fontSize: 12,
                italics: true,
                color: MUTED,
                margin: [0, 0, 0, 6],
            },

            // ── COURSE NAME ──
            {
                text: courseName,
                alignment: 'center',
                fontSize: 22,
                bold: true,
                color: DARK_BROWN,
                characterSpacing: 1,
                margin: [0, 0, 0, 28],
            },

            // ── DECORATIVE DESCRIPTION BLOCK ──
            // Adds content and fills the empty space
            goldRule(0, 14),
            {
                text: 'This credential recognizes the dedication, effort, and commitment demonstrated\nthroughout the duration of this program. The knowledge and skills acquired\nherein are a testament to the recipient\'s excellence and perseverance.',
                alignment: 'center',
                fontSize: 9.5,
                italics: true,
                color: MUTED,
                lineHeight: 1.7,
                margin: [20, 0, 20, 14],
            },
            goldRule(0, 28),

            // ── FOOTER TABLE: Grade | Seal area | Date ──
            {
                table: {
                    widths: ['38%', '24%', '38%'],
                    body: [[

                        // GRADE cell — label on top, value below, underline at bottom
                        {
                            stack: [
                                {
                                    text: 'GRADE',
                                    fontSize: 7,
                                    color: LABEL,
                                    characterSpacing: 2,
                                    margin: [0, 0, 0, 4],
                                },
                                {
                                    text: grade,
                                    fontSize: 26,
                                    bold: true,
                                    color: DARK_BROWN,
                                    margin: [0, 0, 0, 6],
                                },
                                // underline BELOW the grade value
                                {
                                    canvas: [
                                        { type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.75, lineColor: GOLD },
                                    ],
                                },
                            ],
                            border: [false, false, false, false],
                        },

                        // CENTER — seal ornament drawn inline with canvas
                        {
                            stack: [
                                {
                                    canvas: [
                                        // outer circle
                                        { type: 'ellipse', x: 54, y: 34, r1: 28, r2: 28, lineWidth: 1.5, lineColor: GOLD, color: BG },
                                        // inner circle
                                        { type: 'ellipse', x: 54, y: 34, r1: 21, r2: 21, lineWidth: 0.5, lineColor: GOLD_LIGHT, color: BG },
                                        // star lines
                                        { type: 'line', x1: 54, y1: 10, x2: 54, y2: 58, lineWidth: 0.5, lineColor: GOLD_LIGHT },
                                        { type: 'line', x1: 30, y1: 34, x2: 78, y2: 34, lineWidth: 0.5, lineColor: GOLD_LIGHT },
                                        { type: 'line', x1: 38, y1: 18, x2: 70, y2: 50, lineWidth: 0.5, lineColor: GOLD_LIGHT },
                                        { type: 'line', x1: 70, y1: 18, x2: 38, y2: 50, lineWidth: 0.5, lineColor: GOLD_LIGHT },
                                        // center dot
                                        { type: 'ellipse', x: 54, y: 34, r1: 4, r2: 4, color: GOLD, lineColor: GOLD },
                                    ],
                                    width: 108,
                                    height: 68,
                                },
                            ],
                            border: [false, false, false, false],
                            alignment: 'center',
                        },

                        // DATE cell — label on top, value below, underline at bottom
                        {
                            stack: [
                                {
                                    text: 'ISSUED DATE',
                                    fontSize: 7,
                                    color: LABEL,
                                    characterSpacing: 2,
                                    alignment: 'right',
                                    margin: [0, 0, 0, 4],
                                },
                                {
                                    text: formatDate(issueDate),
                                    fontSize: 14,
                                    italics: true,
                                    color: MID_BROWN,
                                    alignment: 'right',
                                    margin: [0, 0, 0, 6],
                                },
                                // underline BELOW the date value
                                {
                                    canvas: [
                                        { type: 'line', x1: 40, y1: 0, x2: 170, y2: 0, lineWidth: 0.75, lineColor: GOLD },
                                    ],
                                },
                            ],
                            border: [false, false, false, false],
                        },

                    ]]
                },
                layout: 'noBorders',
                margin: [0, 0, 0, 0],
            },

        ],
    };

    const pdf = pdfmake.createPdf(docDefinition);
    const filePath = path.join(__dirname, `../temp/${Date.now()}.pdf`);
    await pdf.write(filePath);
    console.log('filePath',filePath);
    

    const result = await updateCloudanrt(filePath, {
         resource_type: 'raw',
        folder: "certificates",  
    public_id: `${userData.name}-${Date.now()}`,
     });

    console.log("result",result);
    
    // return result.secure_url;
    return result.url
};

module.exports = createCertificate;