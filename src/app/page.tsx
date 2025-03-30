import PokemonDisplayArea from "@/components/PokemonDisplayArea";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[url(/assets/images/PokemonBackground.jpg)] bg-center bg-no-repeat bg-cover bg-fixed">
        {/* <Image
          alt="Pokemon grassfield with water background"
          src={PokemonBg}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          className="object-cover"
          /> */}
        <PokemonDisplayArea/>
      </div>
    </>
  );
}
