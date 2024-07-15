import Header from "./Header";
import Content from "./Content";
import Sum from "./Sum";

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content contents={course.parts} />
      <Sum parts={course.parts}/>
    </>
  );
};

export default Course;
