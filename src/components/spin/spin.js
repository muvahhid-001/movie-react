import { Alert, Flex, Spin } from "antd";
import "./spin.css";

const width = window.innerWidth;

const SpinLoad = () => (
  <Flex gap="middle" vertical>
    <Spin tip="Loading...">
      {width < 400 ? null : (
        <Alert
          message="Загрузка фильмов..."
          description="Долгая загрузка? - Включите Vpn"
          type="info"
        />
      )}
    </Spin>
  </Flex>
);
export default SpinLoad;
