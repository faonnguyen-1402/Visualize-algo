import React from 'react';
import { User } from '../../types/user';

interface ProfileCardProps {
  user: User;
  totalExercises: number; // Thêm prop này
  onEditClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, totalExercises, onEditClick }) => {
  const avatarSrc = user.image && user.image.trim() !== "" 
    ? user.image 
    : `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${user.username}`;
    console.log("Dữ liệu user trong ProfileCard:", user);
  return (
    <div className="profile-card">
      {/* {user.image && user.image.length > 0 ? (
        <img src={user.image} alt={user.username} className="profile-avatar" />
      ) : (
        <div className="profile-avatar-placeholder">No Avatar</div>
      )} */}
      <img src={avatarSrc} alt={user.username} className="profile-avatar" />
      
      <h2 className="profile-name">{user.username}</h2>
      <div className="profile-stats">
        <div className="stat-item">
          <div className="stat-value">{totalExercises}</div>
          <div className="stat-label">Completed assignments</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{user.joinyear || "N/A"}</div>
          <div className="stat-label">Join year</div>
        </div>
      </div>
      <button className="edit-btn" onClick={onEditClick}>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;