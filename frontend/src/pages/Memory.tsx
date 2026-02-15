import { useParams } from "react-router-dom";

export default function Memory() {
  const { id } = useParams();
  return <h2>Memory #{id}</h2>;
}
