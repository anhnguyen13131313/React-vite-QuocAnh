# Codex React Learning Setup

Bộ file này dùng để biến Codex trong repo React thành mentor học tập thay vì auto-code agent.

## Cấu trúc

```text
project-root/
├─ AGENTS.md
├─ learning/
│  ├─ react-ultimate-hoidanit.pdf
│  ├─ react-ultimate-hoidanit.md
│  ├─ PROGRESS.md
│  └─ FIRST_CODEX_PROMPT.md
└─ src/...
```

## Vai trò từng file

- `AGENTS.md`: luật dạy học lâu dài cho Codex trong repo.
- `learning/react-ultimate-hoidanit.md`: bản text dễ đọc của tài liệu khóa học; đây là nguồn Codex nên đọc trước.
- `learning/react-ultimate-hoidanit.pdf`: tài liệu gốc để đối chiếu nếu bản Markdown mơ hồ.
- `learning/PROGRESS.md`: checkpoint hiện tại và những mental model đã pass.
- `learning/FIRST_CODEX_PROMPT.md`: prompt bootstrap khi mở chat Codex mới.

## Khi mở chat Codex mới

1. Mở đúng repo này.
2. Tạo chat mới.
3. Copy toàn bộ nội dung `learning/FIRST_CODEX_PROMPT.md` và gửi.
4. Sau đó học bình thường; Codex phải dựa vào `AGENTS.md`, `PROGRESS.md`, course Markdown và code repo.

## Khi pass một bài

Cập nhật `learning/PROGRESS.md`:

- chuyển `Current lesson` sang bài tiếp theo,
- thêm bài vừa pass vào `Completed`,
- ghi ngắn gọn mental model quan trọng vừa hiểu.

Không cần sửa `FIRST_CODEX_PROMPT.md` khi chuyển bài vì prompt này tự đọc bài hiện tại từ `PROGRESS.md`.
