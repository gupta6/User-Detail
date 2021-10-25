type searchProps = {
  search: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const search = (props: searchProps) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        placeholder="Search Here"
        onChange={props.search}
      />
    </div>
  );
};

export default search;
