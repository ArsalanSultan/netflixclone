import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  console.log(location);
  const movie =  location.state.movie;
  
  return (
    <div className="watch">
      <Link to="/">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress
        controls
       // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
       src={movie.video}
      />
    </div>
  );
}
