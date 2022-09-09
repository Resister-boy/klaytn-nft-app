import React from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Feed from "../../components/feed/Feed";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="App">
			<div className="feedContainer">
				<Feed />
			</div>
		</div>
	);
}