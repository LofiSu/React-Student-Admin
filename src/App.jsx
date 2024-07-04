import MyLayout from './components/MyLayout'
import { Routes, Route } from 'react-router-dom'
import StudentType from "./pages/studentType"
import StudentList from "./pages/studentList"
import ClassType from "./pages/classType"
import ClassList from "./pages/classList"
import CourseMenu from "./pages/courseMenu"

function App() {
  return (
    <MyLayout>
      <Routes>
        <Route path="admin/student_menu/student_type" element={<StudentType />} />
        <Route path="admin/student_menu/student_list" element={<StudentList />} />
        <Route path="admin/class_menu/class_type" element={<ClassType />} />
        <Route path="admin/class_menu/class_list" element={<ClassList />} />
        <Route path="/admin/course_menu" element={<CourseMenu />} />
      </Routes>
    </MyLayout>

  )
}

export default App
