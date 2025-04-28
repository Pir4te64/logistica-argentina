import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ value, onChange }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          onClick={() => onChange({ target: { name: "puntos", value: n } })}
          className="focus:outline-none"
        >
          {value >= n ? (
            <FaStar className="text-yellow-400 w-6 h-6" />
          ) : (
            <FaRegStar className="text-gray-300 w-6 h-6" />
          )}
        </button>
      ))}
    </div>
  );
};
export default Rating;