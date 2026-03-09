import { useCurrentUser } from "@/features/auth/hooks/userCurrentUser";

const MyQRCode = () => {
  const { data: user } = useCurrentUser();
  console.log(user);

  return (
    <div style={{ padding: "20px", background: "white" }}>
      {/* <QRCodeSVG
        value={user?.id}
        size={256}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"} // Error correction level ('L', 'M', 'Q', 'H')
      /> */}
    </div>
  );
};

export default MyQRCode;
