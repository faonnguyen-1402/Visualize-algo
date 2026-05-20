type Props = {
  step: number;
  total: number;
  isPlaying: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPlay: () => void;
  onReset: () => void;
};

const Controls = ({
  step,
  total,
  isPlaying,
  onNext,
  onPrev,
  onPlay,
  onReset
}: Props) => {
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
        <button className="btn-secondary" onClick={onReset}>Reset</button>
        <button className="btn-secondary" onClick={onPrev}>← Back</button>

        <button className="btn-primary" onClick={onPlay}>
          {isPlaying ? "⏸Pause" : "▶Play"}
        </button>

        <button className="btn-secondary" onClick={onNext}>Next →</button>
      </div>
    </div>
  );
};

export default Controls;