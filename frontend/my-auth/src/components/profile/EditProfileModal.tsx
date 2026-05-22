import React, { useState, useRef } from 'react';
import { User } from '../../types/user';

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
  const [formData, setFormData] = useState<User>(user);
  const [imagePreview, setImagePreview] = useState<string>(user.image || "");
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
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Edit Profile</h2>
        </div>
        <div className="modal-content">
          <div className="form-group">
            <label className="form-label">Avatar</label>
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
                <div className="avatar-placeholder">Chưa chọn ảnh</div>
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
                Chọn ảnh
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nhập tên của bạn"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;