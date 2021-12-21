import React from "react";
import "@testing-library/jest-dom";
import PrimeraApp from "../PrimeraApp";
import { shallow } from "enzyme";
describe("Pruebas en PrimeraApp", () => {
  /*test('debe de mostrar el saludo: "Hola!!"', () => {
    const welcome = "Hola!!";

    const wrapper = render(<PrimeraApp saludo={ welcome } />);

    expect(wrapper.getByText(welcome)).toBeInTheDocument();
  });*/
  test("Debe de mostrar <PrimeraApp /> correctamente", () => {
    const wrapper = shallow(<PrimeraApp saludo={"Hola!!"} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de mostrar el título enviado por props", () => {
    const welcome = "Hola!!";
    const subtitle = "Estamos con subtítulo";
    const wrapper = shallow(<PrimeraApp saludo={welcome} subtitulo={ subtitle} />);

    const textH1 = wrapper.find('h1').text();

    expect(textH1).toBe(welcome);
  });

  test("Debe de mostrar el subtítulo enviado por props", () => {
    const welcome = "Hola!!";
    const subtitle = "Estamos con subtítulo";
    const wrapper = shallow(<PrimeraApp saludo={welcome} subtitulo={ subtitle} />);

    const textParagraph = wrapper.find('p').text();

    expect(textParagraph).toBe(subtitle);
  });
});
