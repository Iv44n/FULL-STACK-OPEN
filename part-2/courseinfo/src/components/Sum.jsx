const Sum = ({ parts }) => {
  const total = parts.reduce(
    (acc, currentVal) => acc + currentVal.exercises,
    0
  );

  return <strong>total of {total} exercises</strong>;
};

export default Sum;
