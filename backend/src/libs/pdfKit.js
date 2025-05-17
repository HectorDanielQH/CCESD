import PDFDocument from 'pdfkit';

export const buildPDF = (receta, dataCallback, endCallback) => {
    const doc = new PDFDocument({ margin: 50 });
    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    // Configuración de la imagen
    doc.image('ccesd.png', doc.options.margin, 30, { width: 100 });

    // Encabezado del documento
    doc.fontSize(12)
       .font('Helvetica-Bold')
       .fillColor('#003366') // Color azul oscuro para el encabezado
       .text('', {
           align: 'left',
           width: 460, // Ancho limitado para el texto
           lineGap: 4
       })
       .moveDown(1);
    doc.fontSize(12)
       .font('Helvetica-Bold')
       .fillColor('#003366') // Color azul oscuro para el encabezado
       .text('', {
           align: 'left',
           width: 460, // Ancho limitado para el texto
           lineGap: 4
       })
       .moveDown(1);
    doc.fontSize(12)
       .font('Helvetica-Bold')
       .fillColor('#003366') // Color azul oscuro para el encabezado
       .text('', {
           align: 'left',
           width: 460, // Ancho limitado para el texto
           lineGap: 4
       })
       .moveDown(1);
    doc.fontSize(12)
       .font('Helvetica-Bold')
       .fillColor('#003366') // Color azul oscuro para el encabezado
       .text('', {
           align: 'left',
           width: 460, // Ancho limitado para el texto
           lineGap: 4
       })
       .moveDown(1);
    doc.fontSize(12)
       .font('Helvetica-Bold')
       .fillColor('#003366') // Color azul oscuro para el encabezado
       .text('', {
           align: 'left',
           width: 460, // Ancho limitado para el texto
           lineGap: 4
       })
       .moveDown(1);

    // Título de la receta
    doc.fontSize(24)
       .font('Helvetica-Bold')
       .fillColor('#333333') // Gris oscuro para el título
       .text('Receta Médica', {
           align: 'center',
           underline: true
       })
       .moveDown(1);

    // Información del paciente y doctor
    doc.fontSize(14)
       .font('Helvetica')
       .fillColor('#333333') // Gris oscuro para el texto
       .text(`Nombre del Paciente: ${receta.nombrePaciente}`, {
           align: 'left',
           lineGap: 4
       })
       .text(`Nombre del Doctor: ${receta.nombreDoctor}`, {
            align: 'left',
            lineGap: 4
        })
       .text(`Fecha de emisión: ${new Date(receta.createdAt).toLocaleDateString()}`, {
            align: 'left',
        })
       .moveDown(1);

    // Título de la lista de receta
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .fillColor('#003366') // Color azul oscuro para el título de la lista
       .text('Lista de la receta médica:', {
           underline: true
       })
       .moveDown(1);

    // Texto de la receta
    const recetaText = `${receta.receta}`;
    const textWidth = doc.page.width - doc.options.margin * 2;
    const textHeight = doc.heightOfString(recetaText, { width: textWidth });

    let yPosition = doc.y; // Ajustar según el contenido anterior

    // Si el texto ocupa más espacio del disponible en la página, añadir una nueva página
    if (yPosition + textHeight > doc.page.height - doc.options.margin) {
        doc.addPage(); // Añadir una nueva página si el texto es demasiado largo
        yPosition = doc.options.margin; // Reiniciar la posición Y
    }

    // Agregar receta
    doc.fontSize(14)
       .font('Helvetica')
       .fillColor('#333333') // Gris oscuro para el texto
       .text(recetaText, doc.options.margin, yPosition, {
           width: textWidth,
           align: 'left',
           lineGap: 4
       });

    // Dibujar el rectángulo de límite alrededor del texto
    const rectHeight = textHeight + 20; // Altura del rectángulo, incluyendo un pequeño margen
    doc.rect(doc.options.margin - 5, yPosition - 10, textWidth + 10, rectHeight)
       .strokeColor('#003366') // Color azul oscuro para el rectángulo
       .lineWidth(1) // Grosor de la línea
       .stroke();

    doc.end();
};
