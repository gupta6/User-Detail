import IUser from "../../interfaces/IUser";

type CardProps = {
  user: IUser;
  redirect: (user: IUser) => void;
};

const card = (props: CardProps) => {
  return (
    <div className="card h-100" onClick={() => props.redirect(props.user)}>
      <div className="card-header">{props.user.name}</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{props.user.username}</li>
        <li className="list-group-item">{props.user.phone}</li>
        <li className="list-group-item">{props.user.email}</li>
      </ul>
    </div>
  );
};

export default card;
