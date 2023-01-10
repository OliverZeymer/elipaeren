import Heading from "../components/Heading";
import ComponentWrapper from "../components/ComponentWrapper";
import ScrollContainer from "../components/ScrollContainer";
import Tag from "../components/Tag";
import Light from "../components/Light";
import { useContext } from "react";
import useAxios from "../hooks/useAxios";
import IpContext from "../contexts/IpContext";
import TokenContext from "../contexts/TokenContext";

export default function Lights() {
  const { bridgeIpContext } = useContext(IpContext);
  const { token } = useContext(TokenContext);

  const { data, loading, error, put } = useAxios(
    `${bridgeIpContext}/api/${token}/lights`
  );

  return (
    <section className="w-full max-w-full">
      <Heading>Lights (6)</Heading>
      <ScrollContainer className="mt-3">
        <Tag text="All lights on" className="bg-red" />
        <Tag text="All lights off" className="bg-primary" />
        <Tag text="Add to room" className="bg-grey" />
        <Tag text="Add to new room" className="bg-grey" />
        <Tag text="Add to new room" className="bg-grey" />
      </ScrollContainer>
      <Light text="#1" isOn={true} selected={false} />
      <Light text="#2" isOn={false} selected={true} />
    </section>
  );
}
