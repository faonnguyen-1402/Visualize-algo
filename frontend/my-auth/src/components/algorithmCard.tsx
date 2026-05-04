import "../pages/home/mainapp.css";
import { Algorithm } from "../types/algorithm";

type Props = {
  algo: Algorithm;
  index: number;
  onClick: () => void;
};

const AlgorithmCard = ({ algo, index, onClick }: Props) => {
  return (
    <article
      className="algorithm-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      <div className="card-glow"></div>

      <div className="card-content">
        <div className="card-header">
          <span className="card-category">{algo.category}</span>
        </div>

        <h3 className="card-title">{algo.name}</h3>

        <div className="card-footer">
          <span className={`difficulty ${algo.difficulty.toLowerCase()}`}>
            {algo.difficulty}
          </span>
          <span className="card-arrow">Learn →</span>
        </div>
      </div>
    </article>
  );
};

export default AlgorithmCard;