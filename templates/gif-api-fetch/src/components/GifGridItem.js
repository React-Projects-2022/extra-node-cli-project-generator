import PropTypes from "prop-types";
import "animate.css";

export const GifGridItem = ({ img }) => {
  const { title, url } = img;
  return (
    <div className="card animate__animated animate__fadeIn">
      <img src={url} alt={title} />
      <p>{title}</p>
    </div>
  );
};

// Para obligar pasar el argumento para el objeto
GifGridItem.propTypes = {
  img: PropTypes.object.isRequired,
};
