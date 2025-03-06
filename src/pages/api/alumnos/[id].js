export default async function handler(req, res) {
  const { id } = req.query;
  const { method } = req;

  if (method === "GET") {
    try {
      const response = await fetch(`http://localhost:2003/alumnos/${id}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  } else if (method === "PUT") {
    try {
      const response = await fetch(`http://localhost:2003/alumnos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la respuesta:', errorText);
        return res.status(response.status).json({ error: errorText });
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error al actualizar:', error);
      res.status(500).json({ error: "Error al actualizar el alumno" });
    }
  }
}