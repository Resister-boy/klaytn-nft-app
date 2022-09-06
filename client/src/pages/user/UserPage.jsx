import "./userPage.css"
import MyPosts from "../../components/myPosts/myPosts";

export default function UserPage(props) {
  const {user} = props;
  return (
    <>
      <div className="homeContainer">
        <MyPosts user={user}/>
      </div>
    </>
  );
}
