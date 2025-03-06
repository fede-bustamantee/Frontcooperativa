export default async function handler(req, res) {

  const { method } = req;
  const { limit } = req.query; // Obtener el parámetro de consulta 'limit'

  if (method === "GET") {
    try {
      const response = await fetch("http://localhost:2003/pagos");
      const data = await response.json();

      let pagos;
      if (limit) {
        // Si se proporciona el parámetro 'limit', obtener los últimos 'limit' pagos
        const limitNumber = parseInt(limit, 10);
        pagos = data
          .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
          .slice(0, limitNumber);
      } else {
        // Si no se proporciona el parámetro 'limit', obtener todos los pagos
        pagos = data;
      }

      res.status(200).json(pagos);
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
    const data = JSON.parse(req.body);
    try {
      console.log("Datos recibidos del cliente:", data);

      // envio de datos al Backend
      const response = await fetch("http://localhost:2003/pagos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // se espera la respuesta del backend y se conviente en un objeto de JS
      const result = await response.json();
      res.status(200).json(result); // envia respuesta al cliente
    } catch (error) {
      res.status(500).json({ error: "Error al enviar los datos" });
    }
  }

  if (method === "DELETE") {
    const id = req.body;
    try {
      const response = await fetch(`http://localhost:2003/pagos/${id}`, {
        method: "DELETE",
      });
      const responseData = await response.json();
      res.send(responseData);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  if (method === "PUT") {
    try {
      const data = JSON.parse(req.body);
      // Fetch a backend con metodo PUT
      const response = await fetch("http://localhost:2003/pagos", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      res.send(responseData);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
