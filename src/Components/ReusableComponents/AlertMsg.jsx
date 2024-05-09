import Alert from "@mui/material/Alert";

export default function AlertMsg({ type, msg }) {
	if (type === "success") return <Alert severity="success">{msg}</Alert>;
	if (type === "error") return <Alert severity="error">{msg}</Alert>;
	if (type === "info") return <Alert severity="info">{msg}</Alert>;
}
