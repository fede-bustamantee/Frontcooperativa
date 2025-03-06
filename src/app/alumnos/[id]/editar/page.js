"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AlumnosFormComponente from "@/app/componentes/AlumnosFormComponente";

export default function EditarAlumnoPage() {
  const router = useRouter();
  const params = useParams();
  const [alumno, setAlumno] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los datos del alumno
    async function fetchAlumnoData() {
      try {
        const response = await fetch(`/api/alumnos/${params.id}`);
        if (!response.ok) {
          throw new Error('No se pudo cargar el alumno');
        }
        const data = await response.json();
        setAlumno(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        router.push('/alumnos');
      }
    }

    if (params.id) {
      fetchAlumnoData();
    }
  }, [params.id, router]);

  // Función para manejar la actualización del alumno
  const handleUpdateAlumno = async (formData) => {
    try {
      const response = await fetch(`/api/alumnos/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('No se pudo actualizar el alumno');
      }

      // Redirigir a la lista de alumnos después de actualizar
      router.push('/alumnos');
    } catch (error) {
      console.error('Error al actualizar:', error);
      // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-3xl font-bold mb-6">
        Editar Alumno
      </h2>
      <div className="max-w-2xl mx-auto">
        <AlumnosFormComponente 
          handler={handleUpdateAlumno} 
          initialData={alumno} 
        />
      </div>
    </div>
  );
}