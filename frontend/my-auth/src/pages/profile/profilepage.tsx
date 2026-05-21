import React, { useState } from 'react';
import ProfileCard from '../../components/profile/ProfileCard';
import ExerciseTab from '../../components/profile/ExerciseTab';
import ProgressCircle from '../../components/profile/ProgressCircle';
import ActivityHeatmap from '../../components/profile/ActivityHeatmap';
import EditProfileModal from '../../components/profile/EditProfileModal';
import { mockUser, mockExercises } from '../../data/mockdata';
import { User } from '../../types/user';
import './profilepage.css';
import Header from '../../components/header';

function ProfilePage() {
  const [user, setUser] = useState<User>(mockUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'Dễ' | 'Trung bình' | 'Khó'>('Dễ');

  const handleEditClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSaveUser = (updatedUser: User) => setUser(updatedUser);

  return (
    <>
    <Header />

    <div className="container">

      <div className="main-layout">
        <ProfileCard user={user} onEditClick={handleEditClick} />

        <div className="right-column">
          <ExerciseTab
            exercises={mockExercises}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="progress-heatmap">
            <ProgressCircle exercises={mockExercises} />
            <ActivityHeatmap exercises={mockExercises} />
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        user={user}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />
    </div>
    </>
  );
}

export default ProfilePage;