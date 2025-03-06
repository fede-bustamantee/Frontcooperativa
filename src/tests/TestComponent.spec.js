import AlumnoFormComponente from "@/app/componentes/AlumnosFormComponente";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("TestComponent Tests", () => {
  it("should render the component", async () => {
    render(<AlumnoFormComponente />);
    expect(
      await screen.findByText("Alumno Form Component")
    ).toBeInTheDocument();
  });
});
