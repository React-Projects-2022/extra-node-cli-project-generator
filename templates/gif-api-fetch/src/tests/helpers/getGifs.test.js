import { getGifs } from '../../helpers/getGifs';
describe('Pruebas en Helper getGifs Fetch', () => {
    
    test('Debe de traer 10 elementos', async () => {
        const angularGifs = await getGifs('Angular');
        expect(angularGifs.length).toBe(10)
    });

    test('Sin argumentos, debe de dar 0', async () => {
        const angularGifs = await getGifs('');
        expect(angularGifs.length).toBe(0)
    });

});