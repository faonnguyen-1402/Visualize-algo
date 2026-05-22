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
import { useEffect } from 'react';
import axios from 'axios';
import LoadingSkeleton from '../../components/profile/LoadingSkeleton';


function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'EASY' | 'MEDIUM' | 'HARD'>('EASY');
  const [exercises, setExercises] = useState<any[]>([]);
  const [totalExercises, setTotalExercises] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [completedList, setCompletedList] = useState<any[]>([]);


  const handleEditClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSaveUser = (updatedUser: User) => setUser(updatedUser);

  const easyDone = completedList.filter(item => item.exercise.difficulty === 'EASY');
  const mediumDone = completedList.filter(item => item.exercise.difficulty === 'MEDIUM');
  const hardDone = completedList.filter(item => item.exercise.difficulty === 'HARD');

  useEffect(() => {
  const getProfile = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');

      const userRes = await axios.get('http://localhost:3001/users/profile', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      const userId = userRes.data.id; 

      const fetchedUser = userRes.data;
      const userWithYear = {
        ...fetchedUser,
        joinyear: fetchedUser.createdAt 
          ? new Date(fetchedUser.createdAt).getFullYear() 
          : new Date().getFullYear()
      };
   
      const [exerRes, countRes, completedRes, completedListRes] = await Promise.all([
        axios.get('http://localhost:3001/exercise', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:3001/exercise/count', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`http://localhost:3001/exercise/user/${userId}/completed-count`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`http://localhost:3001/exercise/user/${userId}/completed-list`, { headers: { Authorization: `Bearer ${token}` } })
      ]);


      setUser(userWithYear);
      setExercises(exerRes.data);
      setTotalExercises(countRes.data); // Tổng bài tập (ví dụ 40)
      setCompletedCount(completedRes.data); // Số bài đã làm (ví dụ 18)
      setCompletedList(completedListRes.data);

    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
    }finally {
      setIsLoading(false); 
    }
  };
  getProfile();
}, []);

  return (
    <>
    <Header />

    <div className="container">
      {isLoading ? (
        <LoadingSkeleton />):(
          <div className="main-layout">
            {/* <ProfileCard user={user} onEditClick={handleEditClick} /> */}
            {user &&(
            <ProfileCard 
              user={user} 
              totalExercises={completedCount} // Truyền độ dài của danh sách bài tập thật
              onEditClick={handleEditClick} 
            />
            )}
            <div className="right-column">
              <ExerciseTab
                exercises={completedList}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              <div className="progress-heatmap">
                <ProgressCircle exercises={exercises} total={totalExercises} completed={completedCount}/>
                <ActivityHeatmap exercises={exercises} />
              </div>
            </div>
              {user && (
                <EditProfileModal
                  isOpen={isModalOpen}
                  user={user} // Lúc này user đã đảm bảo là kiểu 'User' (không còn null)
                  onClose={handleCloseModal}
                  onSave={handleSaveUser}
                />
              )}
          </div>
        )}
    </div>
    </>
  );
}

export default ProfilePage;