import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content contents={course.parts} />
    </>
  );
};

export default Course;
