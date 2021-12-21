test("debe de ser iguales los dos strings", () => {
  // 1.- Inicialización
  const message = "Hola Mundo";

  // 2.- Estímulo
  const messageTwo = "Hola Mundo";

  // 3.- Observar el comportamiento

  expect(message).toBe(messageTwo);
});
