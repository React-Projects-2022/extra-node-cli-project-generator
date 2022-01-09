import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { Button } from "./../../components/Button";
describe("Pruebas en Button", () => {
  let wrapper;
  const handleAction = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Button
        text={"Details"}
        className={"btn btn-primary"}
        handleAction={handleAction}
      />
    );
  });
  test("Debe de mostrar <Button /> correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Comprobar valores por defecto", () => {
    const textButton = wrapper.find("button");
    expect(textButton.text()).toBe("Details");
    expect(textButton.prop("className")).toBe("btn btn-primary");
  });

  test("Probar acción de click", () => {
    const textButton = wrapper.find("button");
    textButton.simulate("click");
    expect(handleAction).toHaveBeenCalledTimes(1);
    textButton.simulate("click");
    textButton.simulate("click");
    textButton.simulate("click");
    expect(handleAction).toHaveBeenCalledTimes(4);
  });
});
