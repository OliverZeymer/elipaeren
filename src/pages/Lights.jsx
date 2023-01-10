import Heading from "../components/Heading";
import ComponentWrapper from "../components/ComponentWrapper";
import ScrollContainer from "../components/ScrollContainer";
import Tag from "../components/Tag";

export default function Lights() {
  return (
    <section className="w-full max-w-full">
      <Heading>Lights (6)</Heading>
      <ScrollContainer className="mt-3">
        <Tag text="All lights on" className="bg-red" />
        <Tag text="All lights off" className="bg-primary" />
        <Tag text="Add to room" className="bg-grey" />
        <Tag text="Add to new room" className="bg-grey" />
      </ScrollContainer>
    </section>
  );
}
