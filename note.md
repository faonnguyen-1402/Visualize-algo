src/algorithms
npx prisma studio
npx ts-node prisma/seed.ts
npx prisma format //Lệnh này sẽ tự động căn chỉnh và kiểm tra xem các quan hệ đã khớp nhau chưa. Nếu không còn lỗi đỏ, bạn có thể tiến hành migrate:

npx prisma db push (Để tạo bảng trên Supabase).
npx prisma db seed (Để nạp dữ liệu Markdown).