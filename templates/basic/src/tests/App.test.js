import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import App from "../App";
describe("Pruebas en App", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  test("Debe de mostrar <App /> correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Comprobar valores por defecto", () => {
    const textP = wrapper.find("p").text();
    expect(textP).toBe("Edit src/App.js and save to reload.");

    const appLink = wrapper.find(".App-link");
    expect(appLink.text()).toBe("Learn React");
    expect(appLink.prop("className")).toBe("App-link");
    expect(appLink.prop("href")).toBe("https://reactjs.org");

    const imgElement = wrapper.find("img");
    expect(imgElement.prop("src")).toBe("logo.svg");
  });
});
