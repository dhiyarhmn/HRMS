import RoomForm from "@/components/Staff/ruangan/roomform";
import room1 from "@/public/room-1.jpeg";
import { Card } from "antd";
import Image from "next/image";
const { Meta } = Card;

const DaftarRuangan = () => (
  <>
    <Card
      hoverable
      cover={<Image src={room1} alt="room1" />}
      className="w-60 shadow-lg border-2"
      actions={[<RoomForm />]}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
    <Card
      hoverable
      cover={<Image src={room1} alt="room1" />}
      className="w-60 shadow-lg border-2"
      actions={[<RoomForm />]}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
    <Card
      hoverable
      cover={<Image src={room1} alt="room1" />}
      className="w-60 shadow-lg border-2"
      actions={[<RoomForm />]}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
    <Card
      hoverable
      cover={<Image src={room1} alt="room1" />}
      className="w-60 shadow-lg border-2"
      actions={[<RoomForm />]}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
    <Card
      hoverable
      cover={<Image src={room1} alt="room1" />}
      className="w-60 shadow-lg border-2"
      actions={[<RoomForm />]}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
    <Card
      hoverable
      cover={<Image src={room1} alt="room1" />}
      className="w-60 shadow-lg border-2"
      actions={[<RoomForm />]}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
    <Card
      hoverable
      cover={<Image src={room1} alt="room1" />}
      className="w-60 shadow-lg border-2"
      actions={[<RoomForm />]}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  </>
);
export default DaftarRuangan;
