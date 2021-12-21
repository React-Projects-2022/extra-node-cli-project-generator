import PropTypes from "prop-types";
import { useFetchGifs } from "../hooks/useFetchGifs";

import { GifGridItem } from "./GifGridItem";
export const GifGrid = ({ category }) => {
  const { loading, data: images } = useFetchGifs(category);
  return (
    <>
      <h3>{category}</h3>

      <div className="card-grid">
        {loading && <p>Cargando imágenes {category}</p>}
        {images.map((img) => (
          <GifGridItem img={img} key={img.id} />
        ))}
      </div>
    </>
  );
};

// Para obligar pasar el argumento para la función
GifGrid.propTypes = {
  category: PropTypes.string.isRequired,
};
