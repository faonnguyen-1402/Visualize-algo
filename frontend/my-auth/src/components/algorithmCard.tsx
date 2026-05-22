import "../pages/home/mainapp.css";
import { Algorithm } from "../types/algorithm";
import { useTranslation } from "react-i18next";

type Props = {
  algo: Algorithm;
  index: number;
  onClick: () => void;
};

const AlgorithmCard = ({ algo, index, onClick }: Props) => {
  const { t } = useTranslation();
  return (
    <article
      className="algorithm-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      <div className="card-glow"></div>

      <div className="card-content">
        <div className="card-header">
          {/* <span className="card-category">{algo.category?.name}</span> */}
          <span className="card-category">
            {t(`category.${algo.category?.name.toLowerCase() || 'default'}`)}
          </span>
        </div>

        <h3 className="card-title">{algo.title}</h3>

        <div className="card-footer">
          {/* <span className={`difficulty ${algo.difficulty.toLowerCase()}`}>
            {algo.difficulty}
          </span>
          <span className="card-arrow">Learn →</span> */}
          <span className={`difficulty ${algo.difficulty.toLowerCase()}`}>
            {t(`difficulty.${algo.difficulty.toLowerCase()}`)}
          </span>
          <span className="card-arrow">{t('home.card_action')} →</span>
        </div>
      </div>
    </article>
  );
};

export default AlgorithmCard;