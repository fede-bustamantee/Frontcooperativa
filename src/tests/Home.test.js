import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AlumnoFormComponente from "@/app/componentes/AlumnosFormComponente";

describe("AlumnoFormComponente", () => {
  it("debería mostrar el componente", () => {
    render(<AlumnoFormComponente />);
    const h1 = screen.getByText("Alumno Form Component");
    expect(h1).toBeInTheDocument();
  });

  it("debería llamar al handler cuando se envía el formulario", () => {
    const handler = jest.fn();
    render(<AlumnoFormComponente handler={handler} />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(handler).toHaveBeenCalled();
  });

  it("debería actualizar el estado cuando se cambia el valor del input", () => {
    render(<AlumnoFormComponente />);
    const input = screen.getByLabelText("Nombre");
    fireEvent.change(input, { target: { value: "Juan" } });
    expect(input.value).toBe("Juan");
  });

  it("debería mostrar un mensaje de error si el input está vacío al enviar", () => {
    render(<AlumnoFormComponente />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    const errorMessage = screen.getByText("El campo es obligatorio");
    expect(errorMessage).toBeInTheDocument();
  });

  it("debería limpiar el formulario después de enviarlo", () => {
    render(<AlumnoFormComponente />);
    const input = screen.getByLabelText("Nombre");
    fireEvent.change(input, { target: { value: "Juan" } });
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(input.value).toBe("");
  });
});
