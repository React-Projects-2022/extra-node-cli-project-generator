import { GifGrid } from "../../components/GifGrid";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { useFetchGifs } from "../../hooks/useFetchGifs";
// Mockeamos el hooks para añadirle la respuesta que queremos
jest.mock("../../hooks/useFetchGifs");
describe("Pruebas en GifGrid", () => {
  const category = "angular";

  test("De de mostrar que está cargando", () => {
    useFetchGifs.mockReturnValue({
      data: [],
      loading: true,
    });
    const wrapper = shallow(<GifGrid category={category} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Comprobar si el título de "category" es correcto', () => {
    useFetchGifs.mockReturnValue({
      data: [],
      loading: false,
    });
    const wrapper = shallow(<GifGrid category={category} />);
    const title = wrapper.find("h3").text().trim();
    expect(title).toBe(category);
  });

  test("Debe de mostrar items cuando se cargan imágenes con useFetchGifs", () => {
    // Mock con un resultado
    const gifs = [
      {
        id: "sjsjs",
        url: "https://localhost/image/01.jpg",
        title: "Gif angular",
      },
      {
        id: "sjsjs2",
        url: "https://localhost/image/02.jpg",
        title: "Gif angular 2",
      },
    ];
    useFetchGifs.mockReturnValue({
      data: gifs,
      loading: false,
    });
    const wrapper = shallow(<GifGrid category={category} />);
    expect(wrapper).toMatchSnapshot();
    // Si tenemos datos, "p" ya no existe
    const pTag = wrapper.find("p");
    expect(pTag.length).toBe(0);
    // No existe, sería similar al anterior
    expect(pTag.exists()).toBe(false);

    // Evaluando si existe el componente "GridItem"
    expect(wrapper.find("GifGridItem").exists()).toBe(true);
    // Otra manera para evaluar las veces que aparece "GifGridItem"
    expect(wrapper.find("GifGridItem").length).toBe(gifs.length);
  });
});
