import "@testing-library/jest-dom";
import { useFetchGifs } from "../../hooks/useFetchGifs";
import { renderHook } from "@testing-library/react-hooks"; // will attempt to auto-detect

describe("Pruebas en useFetchGifs", () => {
  test("Debe retornar estado inicial", async() => {
    const category = "Angular";

    const { result, waitForNextUpdate } = renderHook(() => useFetchGifs(category));
    // Obtener el resultado del estado inicial antes de la espera
    const { loading, data } = result.current;
    await waitForNextUpdate();
    expect(data).toEqual([]);
    expect(loading).toBe(true);
  });

  test("Debe devolver información con imágenes y loading (false) nuevo estado", async () => {
    const category = "Angular";
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs(category)
    );
    // Esperamos
    await waitForNextUpdate();
    // Obtenemos el resultado del estado ya con información cargada
    const { loading, data } = result.current;
    expect(data).not.toEqual([]);
    expect(loading).toBe(false);
  });
});
