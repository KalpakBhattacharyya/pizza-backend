const PDFDocument = require('pdfkit');

const generateInvoicePDF = (order, callback) => {
    const doc = new PDFDocument({ size: 'A6', margin: 20 }); // Compact bill size, like a real receipt
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        callback(pdfData);
    });

    // --- Header ---
    doc.fillColor('#333333').fontSize(16).text('SLICE PERFECT PIZZERIA', { align: 'center', stroke: true });
    doc.fontSize(8).text('Bhubaneswar, Odisha', { align: 'center' });
    doc.moveDown();
    doc.text(`Invoice ID: ${order._id.toString().slice(-6).toUpperCase()}`, { align: 'left' });
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, { align: 'left' });
    doc.moveDown();

    // --- Table Header ---
    doc.text('-----------------------------------------------------------');
    doc.text('Item                  Qty          Price', { bold: true });
    doc.text('-----------------------------------------------------------');

    // --- Table Rows ---
    order.items.forEach(item => {
        doc.text(`${item.name.padEnd(20)} ${item.quantity.toString().padEnd(12)} ₹${item.price * item.quantity}`);
        if(item.toppings && item.toppings.length > 0) {
            doc.fontSize(6).fillColor('#666666').text(`Toppings: ${item.toppings.join(', ')}`);
            doc.fontSize(8).fillColor('#333333');
        }
    });

    doc.text('-----------------------------------------------------------');
    
    // --- Financial Breakdowns ---
    const subtotal = order.totalAmount || 0;
    const gst = Math.round(subtotal * 0.05); // 5% Restaurant GST
    const grandTotal = subtotal + gst;

    doc.text(`Subtotal: ₹${subtotal}`, { align: 'right' });
    doc.text(`GST (5%): ₹${gst}`, { align: 'right' });
    doc.fontSize(10).text(`Grand Total: ₹${grandTotal}`, { align: 'right', bold: true });
    
    doc.moveDown();
    doc.fontSize(8).text('Thank you for your order! Scan to pay on delivery.', { align: 'center', italic: true });

    doc.end();
};

module.exports = { generateInvoicePDF };