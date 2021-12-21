import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import { AddCategory } from "../../components/AddCategory";
describe("Pruebas en AddCategory", () => {
  const setCategories = jest.fn();
  let wrapper = shallow(<AddCategory setCategories={setCategories} />);;
  beforeEach(() => {
    // Para limpiar los mocks de Jest
    jest.clearAllMocks();
    // Inicializamos el componente
    wrapper = shallow(<AddCategory setCategories={setCategories} />);
  });
  test("Debe de mostrar correctamente el componente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de cambiar la caja de texto", () => {
    const input = wrapper.find("input");
    // Importante añadir el valor de target: value
    input.simulate("change", { target: { value: "Hola mundo" } });
  });

  test("NO debe de postear la información 'onSubmit'", () => {
    const form = wrapper.find("form");
    form.simulate("submit", { preventDefault(){}});

    expect(setCategories).not.toHaveBeenCalled();
  });

  test("Debe de postear la información 'onSubmit' y limpiar input", () => {
    
    // 1.- Simular input change  - Importante añadir el valor de target: value
    wrapper.find("input").simulate("change", { target: { value: "Hola mundo" } });

    // 2.- Ejecutar submit
    wrapper.find("form").simulate("submit", { preventDefault(){}});

    // 3.- Comprobar que setCategories ha sido llamado
    expect(setCategories).toHaveBeenCalled(); // Ha sido llamada una vez por lo menos
    expect(setCategories).toHaveBeenCalledTimes(1); // Veces llamadas
    expect(setCategories).toHaveBeenCalledWith(expect.any(Function)); // Llamada de otra función

    // 4.- Comprobar que se ha limpiado correctamente
    expect(wrapper.find("input").prop('value')).toBe('');
  });
});
