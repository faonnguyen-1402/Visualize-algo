import React from 'react';
import './profileskeleton.css';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="skeleton-layout">
      {/* Skeleton ProfileCard */}
      <div className="sk-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="skeleton sk-avatar" />
        <div className="skeleton sk-text" style={{ width: '60%' }} />
        <div className="skeleton sk-text" style={{ width: '40%' }} />
      </div>

      <div className="skeleton-right">
        {/* Skeleton ExerciseTab */}
        <div className="sk-card" style={{ height: '300px' }}>
          <div className="skeleton sk-text" style={{ width: '20%', marginBottom: '20px' }} />
          <div className="skeleton sk-text" style={{ width: '100%' }} />
          <div className="skeleton sk-text" style={{ width: '100%' }} />
        </div>

        {/* Skeleton Progress & Heatmap */}
        <div className="skeleton-bottom">
          <div className="sk-card" style={{ height: '200px' }} />
          <div className="sk-card" style={{ height: '200px' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;