import { useMember } from "@/features/members/hooks/useMember";
import { QRCodeSVG } from "qrcode.react";

const MyQRCode = () => {
  const { data: member, isWaiting } = useMember();

  if (isWaiting) {
    return <div>Loading member data...</div>;
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      {member?.membershipId && (
        <QRCodeSVG
          value={member.membershipId}
          // size={256}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"} // Error correction level ('L', 'M', 'Q', 'H')
        />
      )}
    </div>
  );
};

export default MyQRCode;
