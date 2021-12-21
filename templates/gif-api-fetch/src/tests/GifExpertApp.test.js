import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { GifExpertApp } from "../GifExpertApp";

describe("Pruebas en GifExpertApp", () => {
  test("Debe mostrar que está cargando", () => {
    const wrapper = shallow(<GifExpertApp />);
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe mostrar lista de categorías", () => {
    const categories = ["React", "Angular"];
    const wrapper = shallow(<GifExpertApp defaultCategories={categories} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("GifGrid").length).toBe(categories.length);
    expect(wrapper.find("AddCategory").length).toBe(1);
  });
});
