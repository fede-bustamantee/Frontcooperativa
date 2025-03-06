export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const response = await fetch("http://localhost:2003/cobros");
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  }

  // se verifica si la solicitud es de tipo POST.
  // primero se analiza el cuerpo de la solicitud (req.body) utilizando JSON.parse()
  // para convertir los datos en un objeto JavaScript.
  //Luego, se registran los datos en la consola mediante console.log(data).
  //Finalmente, se envía una respuesta al cliente utilizando res.status(200).json(),
  // devolviendo un mensaje de "ok" junto con los datos que se recibieron
  //en la solicitud.

  if (method === "POST") {
    try {
      const data = req.body; // Eliminar JSON.parse()
      console.log("Datos recibidos del cliente:", data);
  
      const response = await fetch("http://localhost:2003/cobros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error detallado:", error);
      res.status(500).json({ error: "Error al enviar los datos", details: error.message });
    }
  }

  if (method === "DELETE") {
    const id = req.body;
    try {
      const response = await fetch(`http://localhost:2003/cobros/${id}`, {
        method: "DELETE",
      });
      const responseData = await response.json();
      res.send(responseData);
    } catch (error) {
      res.status(500).send(error);
    }
  }

}
