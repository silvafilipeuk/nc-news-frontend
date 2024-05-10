import "ldrs/helix";

export default function Loading() {
	return (
		<>
			<l-helix
				size="45"
				speed="2.5"
				color="#c4170c"
				style={{ padding: "1em" }}
			></l-helix>
			<h3 style={{ color: "teal" }}>Loading...</h3>
		</>
	);
}
