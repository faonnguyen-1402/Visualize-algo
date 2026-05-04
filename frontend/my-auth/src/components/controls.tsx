type Props = {
  step: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
};

const Controls = ({ step, total, onNext, onPrev }: Props) => {
  return (
    <div className="controls-panel">
      <div className="step-counter">
        <div className="step-label">Step</div>
        <div className="step-value">{step} / {total}</div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>

      <div className="button-group">
        <button className="btn-secondary">Reset</button>
        <button className="btn-secondary" onClick={onPrev}>← Back</button>
        <button className="btn-primary">▶ Play</button>
        <button className="btn-secondary" onClick={onNext}>Next →</button>
      </div>
    </div>
  );
};

export default Controls;