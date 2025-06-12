let receiptRecords = [];  // Array para guardar los registros

function generateInvoiceNumber() {
    // Genera un número de factura único basado en la fecha y una parte aleatoria.
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    // Número de factura: Año-Mes-Día-XXXX
    return `${year}-${month}-${day}-${randomPart}`;
}

function generateReceipt() {
    const barbershopName = document.getElementById("barbershopName").value;
    const serviceDate = document.getElementById("serviceDate").value;
    const serviceDescription = document.getElementById("serviceDescription").value;
    const servicePrice = document.getElementById("servicePrice").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const clientName = document.getElementById("clientName").value || "No especificado";
    
    const invoiceNumber = generateInvoiceNumber(); // Genera el número de factura

    // Asignar valores al recibo
    document.getElementById("receiptInvoiceNumber").innerText = invoiceNumber;
    document.getElementById("receiptBarbershopName").innerText = barbershopName;
    document.getElementById("receiptDate").innerText = serviceDate;
    document.getElementById("receiptService").innerText = serviceDescription;
    document.getElementById("receiptPrice").innerText = servicePrice;
    document.getElementById("receiptPaymentMethod").innerText = paymentMethod;
    document.getElementById("receiptClientName").innerText = clientName;
    document.getElementById("receiptTotal").innerText = servicePrice;

    // Guardar el recibo en el array
    receiptRecords.push({
        invoiceNumber,
        serviceDate,
        serviceDescription,
        servicePrice,
        paymentMethod,
        clientName
    });
}

function printReceipt() {
    const receiptContent = document.getElementById("receipt").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = receiptContent;
    window.print();
    document.body.innerHTML = originalContent;  // Restablecer el contenido original
}

function saveToExcel() {
    // Crear una hoja de trabajo (worksheet) de Excel
    const worksheet = XLSX.utils.json_to_sheet(receiptRecords);

    // Crear un libro de trabajo (workbook) de Excel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Recibos");

    // Guardar el archivo Excel
    XLSX.writeFile(workbook, "recibos_barberia.xlsx");
}
