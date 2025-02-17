import { Alert, Flex, Spin } from "antd";
import "./spin.css";

const SpinLoad = () => (
  <Flex gap="middle" vertical>
    <Spin tip="Loading...">
      <Alert
        message="Загрузка фильмов..."
        description="Долгая загрузка? - Включите Vpn"
        type="info"
      />
    </Spin>
  </Flex>
);
export default SpinLoad;
