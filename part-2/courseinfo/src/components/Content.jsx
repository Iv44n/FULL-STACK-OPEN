import Part from "./Part";

const Content = ({ contents }) => {
  return (
    <div>
      {contents.map((content) => (
        <Part key={content.id} info={content} />
      ))}
    </div>
  );
};

export default Content;
