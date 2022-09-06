import Feed from "../../components/feed/Feed";
import "./home.css"
import MyPosts from "../../components/myPosts/myPosts";

export default function Home() {
  return (
    <>
      <div className="homeContainer">
        <MyPosts userId="6316d007f743b03481ac993b"/>
      </div>
    </>
  );
}
