import { WhatsAppOutlined } from "@ant-design/icons";

const ContactPerson = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/6282158731643", "_blank"); // Ganti dengan nomor WhatsApp admin
  };

  return (
    <div className="fixed bottom-6 right-9 z-50">
      <div
        className="tooltip tooltip-top tooltip-open"
        data-tip="Lupa password?"
      >
        <div className="cursor-pointer" onClick={handleWhatsAppClick}>
          <WhatsAppOutlined
            style={{
              fontSize: "48px",
              color: "#25D366",
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPerson;
