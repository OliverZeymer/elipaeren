import Loader from "./Loader"
import Room from "./Room"

export default function AllRooms({ results, loading, selectedRoom, handleSelect, allRoomsOn }) {
  return (
    <div className="sm:grid sm:grid-cols-auto-fit flex flex-col gap-6 w-full">
      {!loading ? (
        results.map((room, index) => (
          <Room
            key={index}
            room={room}
            id={room.id}
            selected={selectedRoom === room.id}
            onPress={() => handleSelect(room.id)}
            allRoomsOn={allRoomsOn}
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  )
}
