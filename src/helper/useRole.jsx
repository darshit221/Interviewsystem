import { useSelector } from "react-redux";

function useRole() {
  const { role } = useSelector((state) => state.auth?.user);
  if (role?.name === "admin" || role?.name === "hr") {
    return true;
  } else {
    return false;
  }
}

export default useRole;
