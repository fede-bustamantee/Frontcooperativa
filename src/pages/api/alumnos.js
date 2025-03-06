export default async function handler(req, res) {
  
  const { method } = req;
  const { limit } = req.query; // Obtener el parámetro de consulta 'limit'

  if (method === "GET") {
    try {
      const response = await fetch("http://localhost:2003/alumnos");
      const data = await response.json();

      let alumnos;
      if (limit) {
        // Si se proporciona el parámetro 'limit', obtener los últimos 'limit' alumnos
        const limitNumber = parseInt(limit, 10);
        alumnos = data.slice(-limitNumber).reverse();
      } else {
        // Si no se proporciona el parámetro 'limit', obtener todos los alumnos
        alumnos = data;
      }

      res.status(200).json(alumnos);
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
    // Fetch a backend
    try {
      const response = await fetch("http://localhost:2003/alumnos", {
        method: "POST",
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

  if (method === "DELETE") {
    const id = req.body;
    try {
      const response = await fetch(`http://localhost:2003/alumnos/${id}`, {
        method: "DELETE",
      });
      const responseData = await response.json();
      res.send(responseData);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}