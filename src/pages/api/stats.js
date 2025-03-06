export default async function obtenerStats(req, res) {
    const { method } = req;
  
    if (method === "GET") {
      try {
        const response = await fetch("http://localhost:2003/stats");
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos" });
      }
    }
}