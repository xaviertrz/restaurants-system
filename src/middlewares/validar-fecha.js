const validarFecha = (fecha) => {
  const fechaHoy = new Date().toLocaleDateString();
  const fechaFormateada = fecha.replace(/\b0/g, "");

  // Expresión regular para validar el formato D/M/YYYY
  const re = new RegExp(
    "^(0?[1-9]|[1-2][0-9]|3[01])/(0?[1-9]|1[0-2])/(?:(?!0000)[0-9]{4})$"
  );

  if (!re.test(fecha)) {
    throw new Error(`${fecha} no es una fecha válida`);
  }

  if (Date.parse(fechaFormateada) < Date.parse(fechaHoy)) {
    throw new Error(`La fecha ${fechaFormateada} ya pasó.`);
  }

  return true;
};

module.exports = {
  validarFecha,
};
