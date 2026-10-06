# Current Course Progress

Course: React Ultimate với Javascript - Hỏi Dân IT

## Current lesson

#110 - Bài Tập Cập Nhật Book (Uncontrolled Component)

Status: IN PROGRESS

## Completed lessons in current Book section

- #105 - Display Book
- #106 - View Book Detail
- #107 - Thêm Mới Book (Controlled Component)
- #108 - Thêm Mới Book (Uncontrolled Component)
- #109 - Cập Nhật Book (Controlled Component)

## Current learning context

I am now converting the Update Book flow from a controlled React-state implementation to an Ant Design Form uncontrolled implementation.

Important ideas already understood from #109:

- Clicking Edit selects a row record and stores it in `dataUpdate`.
- `dataUpdate` is passed into the update component.
- In the controlled version, `useEffect` copies values from `dataUpdate` into React state used by the inputs.
- `selectedFile` is the newly selected File object.
- `preview` is only for displaying an image in the UI and may point to either the old backend image or a new local blob URL.
- `thumbnail` is the filename sent to the Book API.
- If the user does not choose a new image, reuse `dataUpdate.thumbnail`.
- If the user chooses a new image, upload it first and use the returned filename.
- Update requires `_id` so the backend knows which Book to modify.
- After update succeeds, reload the Book list and render the updated table.

## #110 course target

According to the course, #110 uses Ant Design Form for the update flow:

- `const [form] = Form.useForm()`
- `<Form form={form} onFinish={handleSubmitBtn}>`
- `useEffect` + `form.setFieldsValue(...)` to place `dataUpdate` values into the form
- Wrap fields with `Form.Item`
- Remove React state that was only used to control text/number/select inputs
- Keep image upload state separately
- Modal SAVE should call `form.submit()`
- `handleSubmitBtn(values)` receives the Ant Design Form values
- Reset with `form.resetFields()` after finishing

## Learning mode

I write the code myself.

Codex should:
- explain the current flow
- give progressive hints
- point to similar existing files in the repository
- review what I wrote
- avoid implementing the exercise unless I explicitly request a full implementation

## Next checkpoint

Start #110 by setting up Ant Design Form and understanding this mental model:

`dataUpdate -> useEffect -> form.setFieldsValue(...) -> Antd Form owns field values`

Do not jump directly to submit/update logic before this part is understood and working.
