"use server";

export const CobrosFormActionHandler = async (formData, action = "create") => {
  try {
    let response;

    if (action === "create") {
      // Recopila los datos del formulario
      const data = {
        titulo: formData.get("titulo"),
        descripcion: formData.get("descripcion"),
        monto: parseFloat(formData.get("monto")) || 0, // Asegura que el monto sea un número
      };

      console.log("Datos del formulario (Crear):", data);

      // Envía los datos al servidor para crear un nuevo cobro
      response = await fetch("http://localhost:2003/cobros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else if (action === "delete") {
      // Eliminar cobro por ID
      const id = formData.get("id");

      console.log("ID para eliminar:", id);

      response = await fetch(`http://localhost:3000/api/cobros/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } else {
      throw new Error("Acción no válida");
    }

    // Manejo de errores en la respuesta
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      throw new Error("Error al procesar la solicitud");
    }

    const res = await response.json();
    console.log("Respuesta del servidor:", res);

    return res;
  } catch (error) {
    console.error("Error en el handler:", error.message);
    return { error: "No se pudo completar la operación. Inténtalo de nuevo." };
  }
};
