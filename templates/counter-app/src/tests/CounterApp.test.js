import React from "react";
import "@testing-library/jest-dom";
import CounterApp from "../CounterApp";
import { shallow } from "enzyme";
describe("Pruebas en CounterApp", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CounterApp />);
  });
  test("Debe de mostrar <CounterApp /> correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de mostrar el valor por defecto sin pasar props", () => {
    const textH1 = wrapper.find("h1").text();
    const textH2 = wrapper.find("h2").text();
    expect(textH1).toBe("CounterApp");
    expect(textH2).toBe("10");
  });

  test("Debe de mostrar el valor inicial de 100 pasando desde props", () => {
    const wrapper = shallow(<CounterApp value={100} />);
    const textH1 = wrapper.find("h1").text();
    const textH2 = wrapper.find("h2").text();
    expect(textH1).toBe("CounterApp");
    expect(textH2).toBe("100");
  });
  test("Debe de mostrar el valor del botón +1 renderizado OK", () => {
    const btnOne = wrapper.find("button").at(0);

    expect(btnOne.html()).toBe("<button>+1</button>");
    expect(btnOne.text()).toBe("+1");
  });
  test("Debe de mostrar el valor del botón Reset renderizado OK", () => {
    const btnOne = wrapper.find("button").at(1);

    expect(btnOne.html()).toBe("<button>Reset</button>");
    expect(btnOne.text()).toBe("Reset");
  });
  test("Debe de mostrar el valor del botón -1 renderizado OK", () => {
    const btnOne = wrapper.find("button").at(2);

    expect(btnOne.html()).toBe("<button>-1</button>");
    expect(btnOne.text()).toBe("-1");
  });

  test("Simulando +1 correctamente", () => {
    wrapper.find("button").at(0).simulate("click");

    let counterText = wrapper.find("h2").text().trim();

    expect(counterText).not.toBe("10");
    expect(counterText).toBe("11");

    wrapper.find("button").at(0).simulate("click");

    counterText = wrapper.find("h2").text().trim();

    expect(counterText).not.toBe("11");
    expect(counterText).toBe("12");
  });

  test("Simulando Reset correctamente", () => {
    wrapper.find("button").at(0).simulate("click");

    let counterText = wrapper.find("h2").text().trim();

    expect(counterText).not.toBe("10");
    expect(counterText).toBe("11");

    wrapper.find("button").at(1).simulate("click");

    counterText = wrapper.find("h2").text().trim();

    expect(counterText).not.toBe("11");
    expect(counterText).toBe("10");
  });

  test("Simulando -1 correctamente", () => {
    wrapper.find("button").at(2).simulate("click");

    let counterText = wrapper.find("h2").text().trim();

    expect(counterText).not.toBe("10");
    expect(counterText).toBe("9");

    wrapper.find("button").at(2).simulate("click");

    counterText = wrapper.find("h2").text().trim();

    expect(counterText).not.toBe("9");
    expect(counterText).toBe("8");
  });
});
