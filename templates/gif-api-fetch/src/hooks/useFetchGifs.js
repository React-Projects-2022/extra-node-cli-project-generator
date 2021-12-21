// Recomendable que el nombre del hook empiece con "use..."
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { getGifs } from "../helpers/getGifs";
export const useFetchGifs = (category) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(
    () => {
      getGifs(category).then((imgs) =>
        setState({
          loading: false,
          data: imgs,
        })
      );
    },
    [category] /*Arreglo de dependencias*/
  );

  return state; // { data: [], loading: true}
};


// Para obligar pasar el argumento para la función
useFetchGifs.propTypes = {
  category: PropTypes.string.isRequired,
};