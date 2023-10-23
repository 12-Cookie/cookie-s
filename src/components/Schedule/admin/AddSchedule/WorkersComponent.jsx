const WorkersComponent = ({ value, setWorkersValue }) => {
  const handleWorkers = (e) => {
    setWorkersValue(e.target.value);
  };
  return (
    <>
      <input
        style={{ width: "6.3rem" }}
        required
        onChange={handleWorkers}
        type="number"
        size="sm"
        placeholder="0"
        value={value}
      />
    </>
  );
};

export default WorkersComponent;
