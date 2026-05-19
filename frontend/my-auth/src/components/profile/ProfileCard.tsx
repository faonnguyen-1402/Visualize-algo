import React from 'react';
import { User } from '../../types/user';

interface ProfileCardProps {
  user: User;
  onEditClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onEditClick }) => {
  const totalExercises = 4; //truyền dữ liệu vào đê

  return (
    <div className="profile-card">
      <img src={user.image} alt={user.name} className="profile-avatar" />
      <h2 className="profile-name">{user.name}</h2>
      <div className="profile-stats">
        <div className="stat-item">
          <div className="stat-value">{totalExercises}</div>
          <div className="stat-label">Bài tập đã làm</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{user.joinyear}</div>
          <div className="stat-label">Gia nhập năm</div>
        </div>
      </div>
      <button className="edit-btn" onClick={onEditClick}>
        Chỉnh sửa Profile
      </button>
    </div>
  );
};

export default ProfileCard;