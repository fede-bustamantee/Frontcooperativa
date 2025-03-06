export default async function handler(req, res) {
  const { id } = req.query;
  const { method } = req;

  if (method === "GET") {
    try {
      const response = await fetch(`http://localhost:2003/pagos/${id}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  }

  if (method === "PUT") {
    try {
      const data = JSON.parse(req.body); // Obtenemos los datos para actualizar

      const response = await fetch(`http://localhost:2003/pagos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Enviamos los datos del cobro
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el cobro");
      }

      const responseData = await response.json();
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el cobro" });
    }
  }

  // Lógica para el método DELETE
  if (method === "DELETE") {
    try {
      const response = await fetch(`http://localhost:2003/pagos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el cobro");
      }

      res.status(200).json({ message: "Pago eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el cobro" });
    }
  }

  // Si el método no es GET, PUT o DELETE, devolver error de método no permitido
  if (method !== "GET" && method !== "PUT" && method !== "DELETE") {
    res.status(405).json({ error: "Método no permitido" });
  }
}
