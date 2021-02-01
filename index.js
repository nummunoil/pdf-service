const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const getStream = require("get-stream");
const PDFDocument = require("pdfkit");

require("dotenv").config();

const main = async (doc) => {
  const formData = new FormData();
  const buffer = await getStream.buffer(doc);
  const header = {
    filename: "file.pdf",
    contentType: "application/pdf",
  };

  formData.append("file", buffer, header);
  formData.append("path", "/report/file.pdf");
  formData.append("meta_text", "test");

  const baseUrl = process.env.URL;
  console.log("baseUrl : ", baseUrl);

  const url = `${baseUrl}/api/v2/files`;
  const res = await axios.post(url, formData, {
    headers: formData.getHeaders(),
  });

  console.log("res : ", res.data);
};

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream("output.pdf"));
doc.text("Some text with an embedded font!", 100, 100);
// Finalize PDF file
doc.end();

main(doc);

console.log("Done!!");
