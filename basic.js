const axios = require("axios");
const fs = require("fs");
const PdfPrinter = require("pdfmake");

const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf",
  },
};

const getBase64 = (url) => {
  return axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const image = Buffer.from(response.data, "binary").toString("base64");
      return `data:${response.headers[
        "content-type"
      ].toLowerCase()};base64,${image}`;
    });
};

const main = async () => {
  const url =
    "https://lh3.googleusercontent.com/ogw/ADGmqu9XN31Kua0O0Ny1dCgxNL4ZoHf1U-ESjuzPzMs1=s32-c-mo";

  const docDefinition = {
    content: [
      "First paragraph",
      "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
      {
        image: await getBase64(url),
      },
    ],
  };

  const printer = new PdfPrinter(fonts);
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream("image-basics.pdf"));
  pdfDoc.end();
};

main();

console.log("Done!!");
