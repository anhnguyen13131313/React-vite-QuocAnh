import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from "antd";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <Result
      style={{ scale: "1.25", marginTop: "200px" }}
      status="404"
      title="Oops"
      subTitle={error.statusText || error.message}
      extra={
        <Button type="primary">
          <Link to="/">
            <span>back to homepage</span>
          </Link>
        </Button>
      }
    />
  );
}
