// utils/avatarHelper.ts
export const getAvatarUrl = (user: any) => {
  if (user?.image && user.image.trim() !== "" && user.image !== "null") {
    return user.image;
  }
  // Sử dụng DiceBear làm ảnh mặc định nếu không có ảnh tải lên
  return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${user?.username || 'default'}`;
};