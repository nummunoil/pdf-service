const fs = require("fs");
const FormData = require("form-data");
const PDFDocument = require("pdfkit");
const getStream = require("get-stream");

const docToFormData = async (doc) => {
  const formData = new FormData();
  const buffer = await getStream.buffer(doc);
  const header = {
    filename: "file.pdf",
    contentType: "application/pdf",
  };

  formData.append("file", buffer, header);

  // console.log(formData.getHeaders());
  formData.pipe(fs.createWriteStream("form.pdf"));
};

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream("output.pdf"));
doc.text("Some text with an embedded font!", 100, 100);
// Finalize PDF file
doc.end();

docToFormData(doc);

console.log("Done!!");
