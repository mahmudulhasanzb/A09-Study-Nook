import Link from "next/link";
import Image from "next/image";
import coverImg from "@/assets/study-nook-cover.png"
import FeaturedRooms from "@/components/FeaturedRooms";

export default async function Home() {

  return (
    <>
    <div className="w-full flex flex-col gap-4 md:flex-row justify-between items-center">

      {/* left side */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-[#b5622a]">
          Find Your Perfect Study Room
        </h1>
        <p className=" max-w-md text-[#5c5654]">
          Browse and book quiet, private study rooms and tables in your library.
          List your own room and earn.
        </p>
        <Link href="/rooms">
          <button className="bg-[#b5622a] text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-[#a15323] transition-colors">
            Explore Rooms
          </button>
        </Link>
      </div>

      {/* right side */}
      <div>
        <Image
          src={coverImg}
          alt="Hero"
          width={500}
          height={500}
          className="w-full h-full rounded-lg"
        />
      </div>
      </div>
      
      <FeaturedRooms/>
    </>
  );
}
