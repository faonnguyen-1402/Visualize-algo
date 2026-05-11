import "../pages/home/mainapp.css";

type Props = {
  values: number[];
};

const Visualization = ({ values }: Props) => {
  return (
    <figure className="visualization-area">
      <div className="array-bars">
        {values.map((h, i) => (
          <div
            key={i}
            className="bar"
            style={{ height: `${h}%` }}
          >
            <span className="bar-label">{h}</span>
          </div>
        ))}
      </div>
    </figure>
  );
};

export default Visualization;