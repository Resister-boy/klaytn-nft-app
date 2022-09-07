import "./userPage.css"
import MyPosts from "../../components/myPosts/myPosts";

export default function UserPage(props) {
  const {user} = props;

  if (!user)
  {
    return (<div>{alert("NO USER")}</div>);
  }
  return (
    <>
      <div className="homeContainer">
        <MyPosts user={user}/>
      </div>
    </>
  );
}
