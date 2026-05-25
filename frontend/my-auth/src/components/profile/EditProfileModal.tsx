import React, { useState, useRef } from 'react';
import { User } from '../../types/user';
import { useTranslation } from 'react-i18next';

interface EditProfileModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  user,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();

  const defaultAvatar = user.image && user.image.trim() !== "" 
    ? user.image 
    : `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${user.username}`;

  const [formData, setFormData] = useState<User>(user);
  // const [imagePreview, setImagePreview] = useState<string>(user.image || "");
  const [imagePreview, setImagePreview] = useState<string>(defaultAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className={`profile-modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="profile-modal">
        <div className="profile-modal-header">
          <h2 className="profile-modal-title">{t('profile.modal.edit_title')}</h2>
        </div>
        <div className="profile-modal-content">
          <div className="form-group">
            <label className="form-label">{t('profile.modal.avatar')}</label>
            {/* <div className="file-input-wrapper">
              <img src={imagePreview} alt="Preview" className="avatar-preview" />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <button
                className="upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Chọn ảnh
              </button>
            </div> */}
            <div className="file-input-wrapper">
              {/* Kiểm tra imagePreview có tồn tại và không rỗng */}
              {imagePreview && imagePreview.trim() !== "" ? (
                <img src={imagePreview} alt="Preview" className="avatar-preview" />
              ) : (
                <div className="avatar-placeholder">{t('profile.modal.placeholder_no_photo')}</div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                style={{ display: 'none' }} // Ẩn input file đi cho gọn
              />
              <button
                className="upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                {t('profile.modal.select_photo')}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              {t('profile.modal.name')}
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              placeholder={t('profile.modal.name_placeholder')}
            />
          </div>
        </div>

        <div className="profile-modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            {t('profile.modal.cancel')}
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            {t('profile.modal.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;