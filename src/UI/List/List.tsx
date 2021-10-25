import IUser from "../../interfaces/IUser";

type ListProps = {
  users: IUser[];
  delEmail: (user: IUser) => void;
  enableEdit: (user: IUser) => void;
  changed: (e: React.ChangeEvent<HTMLInputElement>, user: IUser) => void;
  redirect: (user: IUser) => void;
};

const List = (props: ListProps) => {
  return (
    <div className="table-responsive">
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td onClick={() => props.redirect(user)}>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.username}</td>
              <td>
                {user.editable ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={(event) => props.changed(event, user)}
                  />
                ) : (
                  <span>{user.email}</span>
                )}{" "}
              </td>
              <td>
                <i
                  role="button"
                  onClick={() => props.enableEdit(user)}
                  className="las la-edit text-secondary"
                ></i>
                <i
                  role="button"
                  onClick={() => props.delEmail(user)}
                  className="las la-trash-alt text-danger"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
