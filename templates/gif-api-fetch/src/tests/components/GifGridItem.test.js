import { GifGridItem } from "../../components/GifGridItem";
import { shallow } from 'enzyme';
describe('Pruebas en GifGridItem', () => {
    let img;
    let wrapper;
    beforeEach(() => {
        img = {
            title: 'Reaction',
            url: 'https://media0.giphy.com/media/tfUW8mhiFk8NlJhgEh/giphy.gif?cid=88be9d0a1nf5v24mivlell2rqw0r5g8tt54n7i76j175j9xk&rid=giphy.gif&ct=g'
        }
        wrapper = shallow(<GifGridItem img={img}/>);
    })
    test('Debe de mostrar correctamente el componente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('Comprobar si el título es el correcto', () => {
        const title = wrapper.find("p").text().trim();
        expect(title).toBe(img.title);
    });

    test('Comprobar si propiedades de imagen son correctas', () => {
        
        const imgData = wrapper.find("img").props();

        expect(imgData.src).toBe(img.url);
        expect(imgData.alt).toBe(img.title);
    });

    test('Comprobar si está añadiendo correctamente clase "animate__fadeIn"', () => {
        
        const divClassName = wrapper.find("div").props().className;
        expect(divClassName.includes('animate__fadeIn')).toBe(true);
    
    });
});