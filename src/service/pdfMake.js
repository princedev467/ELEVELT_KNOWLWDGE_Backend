const { text } = require('express');
const pdfmake = require('pdfmake');


const createPdf = () => {

    try {
        const fonts = {
            Roboto: {
                normal: './public/fonts/Roboto-Regular.ttf',
                bold: './public/fonts/Roboto-Medium.ttf',
                italics: './public/fonts/Roboto-Italic.ttf',
                bolditalics: './public/fonts/Roboto-MediumItalic.ttf'
            }
        };

        pdfmake.addFonts(fonts);

        const docDefinition = {
            content: [
                {
                    columns: [
                        {
                            image: './public/image/pdflogo/amzonlogo-removebg-preview.png',
                            width: 120,
                            height: 70,

                        },
                        {
                            stack: [
                                { text: 'Tax Invoice/Bill of Supply/Cash Memo', bold: true, alignment: 'right' },
                                { text: '(Original for Recipient)', alignment: 'right' }
                            ],
                            margin: [0, 20, 0, 0]
                        }
                    ],
                    margin: [0, 0, 0, 10]
                },
                {
                    columns: [
                        {
                            stack: [
                                { text: 'Sold By', bold: true, fontsize: 12 },
                                { text: 'SUPER MARKETING ', fontsize: 15 },
                                { text: '*Super Marketinrg Agency, Plot No. 613, Sumer' },
                                { text: 'Nagar Main, Nea, r Gagan Bharti School,' },
                                { text: 'Mansarovar Jaipur - 302020' },
                                { text: 'JAIPUR, RAJASTHAN, 302020' },
                                { text: 'IN' }
                            ]
                        },
                        {
                            stack: [
                                { text: 'Billing Address :', bold: true, alignment: 'right' },
                                { text: 'Prince Chaturbhai Movaliaya', alignment: 'right' },
                                { text: '86,Ruxmani Soc,Nana Varacha', alignment: 'right' },
                                { text: 'Surat,Gujarat,395006', alignment: 'right' },
                                { text: 'IN', alignment: 'right' },
                                {
                                    text: [
                                        { text: 'State/UT Code :', bold: true, alignment: 'right' },
                                        { text: '24', alignment: 'right' },
                                    ], alignment: 'right'
                                },
                            ]
                        }
                    ]
                },
                {
                    columns: [
                        {
                            width: '50%',
                            stack: [
                                { text: 'PAN No:EPSPK8990C', bold: true },
                                { text: "GST Registration No: 08EPSPK8990C1Z5", bold: true },
                            ]
                        },
                        {
                            width: '50%',
                            alignment: 'right',
                            stack: [
                                { text: 'Shipping Address :', bold: true },
                                { text: "Prince Chaturbhai Movaliaya" },
                                { text: "86,Ruxmani Soc,Nana Varacha" },
                                { text: "Surat,Gujarat,395006" },
                                { text: 'IN' },
                                { text: 'State/UT Code: 24', bold: true }
                            ]
                        }
                    ]
                },
                {
                    columns: [
                        {
                            width: '50%',
                            stack: [
                                { text: 'Order Number: 405-0419869-0333924', bold: true },
                                { text: "Order Date: 28.01.2025", bold: true },
                            ]
                        },
                        {
                            width: '50%',
                            alignment: 'right',
                            stack: [
                                { text: 'Place of supply: GUJARAT ', bold: true },
                                { text: "Place of delivery: GUJARAT", bold: true },
                                { text: "Invoice Number : IN-803", bold: true },
                                { text: "Invoice Details : RJ-315637153-2425", bold: true },
                                { text: 'Invoice Date : 28.01.2025', bold: true },
                                { text: 'State/UT Code: 24', bold: true }
                            ]
                        }
                    ],
                      margin: [0, 0, 0, 20]
                },
                {
                    table: {
                        body: [
                            [
                                { text: 'Sl.No', bold: true, fillColor: '#D9D9D9' },
                                { text: 'Description', bold: true, fillColor: '#D9D9D9' },
                                { text: 'Unit\nPrice', bold: true, fillColor: '#D9D9D9' },
                                { text: 'Qty', bold: true, fillColor: '#D9D9D9' },
                                { text: 'Net\nAmount', bold: true, fillColor: '#D9D9D9' },
                                { text: 'Tax\nRate', bold: true, fillColor: '#D9D9D9' },
                                { text: 'Tax\nType', bold: true, fillColor: '#D9D9D9' },
                                { text: 'Tax\nAmount', bold: true, fillColor: '#D9D9D9' },
                                { text: 'Total\nAmount', bold: true, fillColor: '#D9D9D9' }
                            ],
                            [

                                { text: '1', rowSpan: 2 },
                                { text: 'Google Review NFC Card Along with QR Code | Tap or Scan for\nReviews/Feedback | PVC Card with UV Print | Pre-Printed Multicolored\n| B0CYD64SY3 ( GRC1001 )\nHSN:5201', border: [true, true, true, false] },
                                { text: "₹117.80", border: [true, true, true, false] },
                                { text: "2", border: [true, true, true, false] },
                                { text: "₹235.60", border: [true, true, true, false] },
                                { text: " 18%", border: [true, true, true, false] },
                                { text: " IGST", border: [true, true, true, false] },
                                { text: "40", border: [true, true, true, false] },
                                { text: "₹278.00", border: [true, true, true, false] },
                            ],
                            [
                                '',
                                { text: 'Shipping Charges', border: [true, false, true, true] },
                                { text: '₹33.90', border: [true, false, true, true] },
                                { text: '', border: [true, false, true, true] },
                                { text: '₹67.80', border: [true, false, true, true] },
                                { text: '18%', border: [true, false, true, true] },
                                { text: ' IGST', border: [true, false, true, true] },
                                { text: '₹12.20', border: [true, false, true, true] },
                                { text: '₹80.00', border: [true, false, true, true] }

                            ],
                            [
                                { text: "Total", colSpan: 7, verticalAlignment: "middle" }, '', '', '', '', '', '',
                                { text: "₹54.60", verticalAlignment: "middle", bold: true, fillColor: '#D9D9D9' },
                                { text: "₹358.00", verticalAlignment: "middle", bold: true, fillColor: '#D9D9D9' }
                            ],
                            [
                                { text: "Amount in Words:", colSpan: 9, bold: true, verticalAlignment: "middle" ,border:[true,true,true,false]}, '','','','','','','',''
                                    
                            ],
                            [
                                { text: "Three Hundred Fifty-eight only", colSpan: 9, bold: true, verticalAlignment: "middle",border:[true,false,true,true] },
                                '','','','','','','',''
                            ],
                            [
                                 { text: "For SUPER MARKETING:", colSpan: 9, bold: true, verticalAlignment: "middle",alignment:'right',border:[true,true,true,false]},
                                 '','','','','','','','',
                            ],
                            [
                                 { 
                                    
                                     image: './public/image/pdflogo/Screenshot 2026-02-10 161918.jpg',
                                    width: 50,
                                    height: 30,
                                    
                                  colSpan: 9, bold: true, verticalAlignment: "middle",alignment:'right',border:[true,false,true,false]},
                                 '','','','','','','','',
                            ],
                             [
                                 { text: "Authorized Signatory", colSpan: 9, bold: true, verticalAlignment: "middle",alignment:'right',border:[true,false,true,true]},
                                 '','','','','','','','',
                            ],

                        ]
                    }
                },'Whether tax is payable under reverse charge - No\n\n\n\n',
                {
                    table: {
                        body: [
                            ['Payment Transaction ID:\n1112wwZD1UzLIjSf7OFM9Vqkv', { text: 'Date & Time: 28/01/2025, 19:09:00\nhrs ', fontSize: 9 }, { text: "Invoice Value:\n358.00", rowSpan: 2, verticalAlignment: "middle" }, 'Mode of Payment:\nAmazonPa'],
                            ['Payment Transaction ID:\n1112rGnrZzfROO1OaWwcPbJwY', { text: 'Date & Time: 28/01/2025, 19:09:00\nhrs ', fontSize: 9 }, '', 'Mode of Payment: GiftCard'],

                        ]
                    }
                }

            ]
        };

        // const docDefinition = {
        //     content: [
        //         {
        //             columns: [
        //                 {
        //                     image: './public/image/pdflogo/amzonlogo-removebg-preview.png',
        //                     width: 180,
        //                     height: 130,
        //                     margin: [0, 0, 0, 0]
        //                 },
        //                 {
        //                     text: 'Tax Invoice/Bill of Supply/Cash Memo\n(Original for Recipient)',
        //                     bold: true,
        //                     alignment: 'right',
        //                     margin: [0, 50, 0, 0]
        //                 }

        //             ]
        //         },
        //         {
        //             columns: [
        //                 {
        //                     width: '50%',
        //                     stack: [
        //                         { text: 'Sold By:', bold: true },
        //                         { text: "SUPER MARKETING " },
        //                         { text: "Super Marketinrg Agency, Plot No. 613, Sumer" },
        //                         { text: "Nagar Main, Near Gagan Bharti School," },
        //                         { text: 'Mansarovar Jaipur - 302020'},
        //                         { text: 'AIPUR, RAJASTHAN, 302020\nIN' }
        //                     ]
        //                 },
        //                 {
        //                     width: '50%',
        //                     alignment: 'right',
        //                     stack: [
        //                         { text: 'Billing Address :', bold: true },
        //                         { text: "Prince Chaturbhai Movaliaya" },
        //                         { text: "86,Ruxmani Soc,Nana Varacha" },
        //                         { text: "Surat,Gujarat,395006" },
        //                         { text: 'IN' },
        //                         { text: 'State/UT Code: 24', bold: true }
        //                     ]
        //                 }
        //             ],
        //             margin: [0, 0, 0, 28]
        //         },

        //         {
        //             columns: [
        //                 {
        //                     width: '50%',
        //                     stack: [
        //                         { text: 'PAN No:EPSPK8990C', bold: true },
        //                         { text: "GST Registration No: 08EPSPK8990C1Z5", bold: true },
        //                     ]
        //                 },
        //                 {
        //                     width: '50%',
        //                     alignment: 'right',
        //                     stack: [
        //                         { text: 'Shipping Address :', bold: true },
        //                         { text: "Prince Chaturbhai Movaliaya" },
        //                         { text: "86,Ruxmani Soc,Nana Varacha" },
        //                         { text: "Surat,Gujarat,395006" },
        //                         { text: 'IN' },
        //                         { text: 'State/UT Code: 24', bold: true }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             columns: [
        //                 {
        //                     width: '50%',
        //                     stack: [
        //                         { text: 'Order Number: 405-0419869-0333924', bold: true },
        //                         { text: "Order Date: 28.01.2025", bold: true },
        //                     ]
        //                 },
        //                 {
        //                     width: '50%',
        //                     alignment: 'right',
        //                     stack: [
        //                         { text: 'Place of supply: GUJARAT ', bold: true },
        //                         { text: "Place of delivery: GUJARAT", bold: true },
        //                         { text: "Invoice Number : IN-803", bold: true },
        //                         { text: "Invoice Details : RJ-315637153-2425", bold: true },
        //                         { text: 'Invoice Date : 28.01.2025', bold: true },
        //                         { text: 'State/UT Code: 24', bold: true }
        //                     ]
        //                 }
        //             ],
        //               margin: [0, 0, 0, 20]
        //         },
        //         {
        //             table: {
        //                 body: [
        //                     [
        //                         { text: 'Sl.No', bold: true, fillColor: '#D9D9D9' },
        //                         { text: 'Description', bold: true, fillColor: '#D9D9D9' },
        //                         { text: 'Unit\nPrice', bold: true, fillColor: '#D9D9D9' },
        //                         { text: 'Qty', bold: true, fillColor: '#D9D9D9' },
        //                         { text: 'Net\nAmount', bold: true, fillColor: '#D9D9D9' },
        //                         { text: 'Tax\nRate', bold: true, fillColor: '#D9D9D9' },
        //                         { text: 'Tax\nType', bold: true, fillColor: '#D9D9D9' },
        //                         { text: 'Tax\nAmount', bold: true, fillColor: '#D9D9D9' },
        //                         { text: 'Total\nAmount', bold: true, fillColor: '#D9D9D9' }
        //                     ],
        //                     [
        //                         '1',
        //                         'Google Review NFC Card Along with QR Code | Tap or Scan for\nReviews/Feedback | PVC Card with UV Print | Pre-Printed Multicolored\n| B0CYD64SY3 ( GRC1001 )\nHSN:5201\n\nShipping Charges',
        //                         { text: "₹117.80\n\n\n\n\n\n\n\n\n₹33.90" },
        //                         { text: "2", verticalAlignment: "middle" },
        //                         { text: "₹235.60\n\n\n\n\n\n\n\n\n₹67.80" },
        //                         { text: " 18%\n\n\n\n\n\n\n\n\n18%" },
        //                         { text: " IGST },
        //                         { text: "40" },
        //                         { text: "₹278.00" },
        //                         // { text: gnment: "bottom" }
        //                     ],
        //                     [
        //                         { text: "Total", colSpan:7, verticalAlignment: "middle" }, '', '', '', '', '', '',
        //                         { text: "₹54.60", verticalAlignment: "middle", bold: true, fillColor: '#D9D9D9' },
        //                         { text: "₹358.00", verticalAlignment: "middle", bold: true, fillColor: '#D9D9D9' },
        //                     ],
        //                     // [
        //                     //          {}, {},  {}, {},  {}, {},  {}, {},  { text: "Amount in Words:\nThree Hundred Fifty-eight only", rowSpan: 3, colSpan:9, fontSize: 15, bold: true }, '', '', '', '', '', '', '', ''
        //                     // ],
        //                     // [
        //                     //      '', '', '', '', '','', '', '',  { text: 'For SUPER MARKETING:', rowSpan: 3, fontSize: 15, bold: true }
        //                     // ],
        //                     // [
        //                     //     '', '', '', '', '','', '', '', 
        //                     //     {
        //                     //         image: './public/image/pdflogo/Screenshot 2026-02-10 161918.jpg',
        //                     //         width: 50,
        //                     //         height: 30,
        //                     //     }
        //                     // ],
        //                 ]
        //             }
        //         },
        //         'Whether tax is payable under reverse charge - No\n\n\n\n',

        //         {
        //             table: {
        //                 body: [
        //                     ['Payment Transaction ID:\n1112wwZD1UzLIjSf7OFM9Vqkv', { text: 'Date & Time: 28/01/2025, 19:09:00\nhrs ', fontSize: 9 }, { text: "Invoice Value:\n358.00", rowSpan: 2, verticalAlignment: "middle" }, 'Mode of Payment:\nAmazonPa'],
        //                     ['Payment Transaction ID:\n1112rGnrZzfROO1OaWwcPbJwY', { text: 'Date & Time: 28/01/2025, 19:09:00\nhrs ', fontSize: 9 }, '', 'Mode of Payment: GiftCard'],

        //                 ]
        //             }
        //         },

        //     ]
        // };

        const pdf = pdfmake.createPdf(docDefinition);
        pdf.write('invoice_Second.pdf').then(() => {
            console.log('create file successfull');
        }, err => {
            console.error(err);
        });
    } catch (error) {
        console.log(error);

    }
}

module.exports = createPdf