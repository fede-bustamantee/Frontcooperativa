// esta función StudientFormActionHandler se utiliza para enviar datos de un formulario
// de estudiante a una API en un servidor Next.js, esperar la respuesta del servidor y
// devolverla.

"use server";

export const StudientFormActionHandler = async (formData) => {
  // Verificar si es un objeto o FormData
  const data = {
    nombre: formData instanceof FormData 
      ? formData.get("nombre") 
      : formData.nombre,
    apellido: formData instanceof FormData 
      ? formData.get("apellido") 
      : formData.apellido,
    dni: formData instanceof FormData 
      ? formData.get("dni") 
      : formData.dni,
    direccion: formData instanceof FormData 
      ? formData.get("direccion") 
      : formData.direccion,
    telefono: formData instanceof FormData 
      ? formData.get("telefono") 
      : formData.telefono,
    email: formData instanceof FormData 
      ? formData.get("email") 
      : formData.email,
    fechaNacimiento: formData instanceof FormData 
      ? formData.get("fechaNacimiento") 
      : formData.fechaNacimiento,
    fechaIngreso: formData instanceof FormData 
      ? formData.get("fechaIngreso") 
      : formData.fechaIngreso,
  };

  const response = await fetch("http://localhost:3000/api/alumnos", {
    method: "POST",
    body: JSON.stringify(data), 
  });

  const result = await response.json();
  return result;
};