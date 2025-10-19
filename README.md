# Tuvigenz - Prototype

Đây là bản prototype website xem tử vi (tông sáng, gọn gàng). Được thiết kế để deploy trực tiếp lên Vercel.

## Cách deploy nhanh
1. Tạo repository mới trên GitHub (ví dụ: `tuvigenz`).
2. Upload (drag & drop) toàn bộ nội dung thư mục `tuvigenz` vào repo.
3. Trên Vercel dashboard -> Add New Project -> Import Git Repository -> chọn repo `tuvigenz`.
4. Vercel sẽ cài đặt dependencies và build. Sau vài phút, site sẵn sàng.

## Lưu ý
- Backend là API serverless ở `api/compute.js` (dùng package `solarlunar`).
- Nếu Vercel báo lỗi khi build vì dependency, bạn có thể chạy `npm install` locally to check, hoặc thêm `package-lock.json`. Vercel sẽ cài đặt dependencies tự động.
- Mã hiện tại trả kết quả sơ bộ + một số luận giải mẫu. Mình sẽ mở rộng rule snippets từ tài liệu của bạn nếu bạn muốn.

## Muốn mình giúp deploy?
- Nếu bạn muốn, mình có thể hướng dẫn từng bước upload repo và deploy trên Vercel (mình sẽ cung cấp từng ảnh chụp màn hình và hướng dẫn copy-paste).
