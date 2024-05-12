import { CircularProgress } from "@mui/material";

export default function Loading() {
	return (
		<>
			<CircularProgress
				sx={{ justifySelf: "center", color: "#c4170c" }}
			/>
			<h3 style={{ justifySelf: "center", color: "teal" }}>Loading...</h3>
		</>
	);
}
