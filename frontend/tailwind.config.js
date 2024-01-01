/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ,],
  theme: {
    extend: {
      backgroundColor: {
        "main-app": "#f8f9fa",
        appbar: "#dee2e6",
        "appbar-item-hover": "#adb5bd",
        overlay: "rgba(0,0,0,0.5)",
        "appbar-button": "#adb5bd",
        "addTask-form": "#ffffff",
        "addTask-form-button-cancel": "#e9ecef",
        "addTask-form-button-cancel-hover": "#ced4da",
        "addTask-form-button-addTask-hover": "#212529",
        "addTask-form-button-addTask": "#343a40",
        "addTask-form-button-addTask-disabled": "#495057",
        "auth-button-hover": "#343a40",
        "auth-button": "#212529",
        avatar: "#7209b7",
        "editTask-form-header": "#ced4da",
        "editTask-form-header-listType-hover": "#adb5bd",
      },
      boxShadow: {
        addTaskForm: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
      textColor: {
        initialLoader: "#dee2e6",
        "todo-logo": "#212529",
        "app-text": "#212529",
        "form-required-star": "#ef233c",
        "form-error": "#ef233c",
        "auth-button": "#e9ecef",
        "avatar-text": "#f8f9fa",
        "todo-description": "#6c757d",
        "todo-dueDate": "#6c757d",
        "todo-dueDate-expired": "#ef233c",
      },
      borderColor: {
        "form-input": "#dee2e6",
        "form-input-focus": "#6c757d",
        "form-error": "#ef233c",
        "todo-checkbox": "#6c757d",
        "edit-form-header": "#dee2e6",
      },
    },
  },
  plugins: [],
};
