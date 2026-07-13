const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="w-10 h-10 rounded-full animate-spin"
        style={{ border: '4px solid var(--line)', borderTopColor: 'var(--accent)' }}
      ></div>
    </div>
  );
};

export default Spinner;
