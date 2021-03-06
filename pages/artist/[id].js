import Head from 'next/head'
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@utils/GlobalContext";
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import Skeletons from '@components/Skeletons';
import { useRouter } from 'next/router';
import { supabase } from '@libs/Supabase';

// export async function getServerSideProps(context) {
//   const id = context.params.id
//   const supabaseAdmin = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

//   // const { data } = await supabaseAdmin.from('artist').select(`*, song (*)`).match({ id: id });
//   const { data } = await supabaseAdmin
//     .from('artist')
//     .select(`
//       id,
//       name,
//       genre,
//       coverUrl,
//       song (
//         id,
//         name,
//         youtubeId,
//         albumCoverUrl,
//         artistId
//       )
//     `)
//     .match({ id: id });

//   return {
//     props: {
//       artist: data[0]
//     }
//   };
// }

// export default function Artist({ artist }) {
export default function Artist() {
  const { darkMode, setDarkMode } = useContext(GlobalContext);
  const [fetched, setFetched] = useState(false);
  const [artist, setSong] = useState();
  const router = useRouter()
  const id = router.query.id

  async function getArtist() {
    const { data } = await supabase.from('artist').select(`*, song (*)`).match({ id: id });
    if (data) {
      setSong(data[0])
      setFetched(true)
    }
  }

  useEffect(() => {
    if (!fetched || !artist) {
      getArtist();
    }
  }, [fetched, id])

  return (
    <div>
      <Head>
        <title>{artist?.name || "Artist"} - Songs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="dark:bg-neutral-900 min-h-screen p-8 md:p-12">
        <div className="max-w-lg mx-auto">

          <nav className="flex justify-between mb-8 gap-x-4">
            <Link href="/">
              <span className="text-blue-500 hover:text-blue-600 font-medium transition-all hover:cursor-pointer">Songs</span>
            </Link>
            <Link href="/artists">
              <span className="text-blue-500 hover:text-blue-600 font-medium transition-all hover:cursor-pointer">Artists</span>
            </Link>
            <div onClick={() => setDarkMode(!darkMode)} className="transition-all cursor-pointer w-12 h-7 dark:bg-blue-500 bg-neutral-200 rounded-full relative">
              <div className="h-5 w-5 bg-white rounded-full absolute top-1 transition-all dark:left-6 left-1"></div>
            </div>
          </nav>


          {fetched ?
            <>
              <div>
                <h1 className="text-neutral-700 dark:text-gray-100 text-xl font-bold">{artist.name}</h1>
                <p className="text-sm sm:text-base text-neutral-700 dark:text-gray-300 mt-1 font-medium">{artist.genre}</p>
              </div>

              <div className="mt-4">
                <div className="relative h-56 md:h-72">
                  <Image
                    alt={artist.name}
                    src={artist.coverUrl}
                    className="rounded"
                    layout='fill'
                  />
                </div>
                <div className="my-4">
                  <h2 className="text-md sm:text-lg font-medium dark:text-white text-neutral-800 my-2 group-hover:text-blue-500 transition duration-300">{artist.name} Songs</h2>
                  {artist.song.map((song, index) =>
                    <Link key={song.id} href={`/song/${song.id}`}>
                      <a className="block text-sm sm:text-base text-neutral-700 dark:text-gray-300 mb-1.5 hover:!text-blue-500 transition-all">{index + 1} - {song.name}</a>
                    </Link>
                  )}
                </div>
              </div>
            </>
            :
            <>
              <Skeletons className="!h-8 !w-40" />
              <Skeletons className="!h-6 !w-16 !mb-4" />
              <Skeletons className="!h-52 !mb-4" />
              <Skeletons className="!h-6 !w-32" />
              <Skeletons className="!h-6 !w-32" />
              <Skeletons className="!h-6 !w-32" />
              <Skeletons className="!h-6 !w-32" />
              <Skeletons className="!h-6 !w-32" />
            </>
          }

          {/* <div>
            <h1 className="text-neutral-700 dark:text-gray-100 text-xl font-bold">{artist.name}</h1>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-gray-300 mt-1 font-medium">{artist.genre}</p>
          </div>

          <div className="mt-4">
            <div className="relative h-56 md:h-72">
              <Image
                alt={artist.name}
                src={artist.coverUrl}
                className="rounded"
                layout='fill'
              />
            </div>
            <div className="my-4">
              <h2 className="text-md sm:text-lg font-medium dark:text-white text-neutral-800 my-2 group-hover:text-blue-500 transition duration-300">{artist.name} Songs</h2>
              {artist.song.map((song, index) =>
                <Link key={song.id} href={`/song/${song.id}`}>
                  <a className="block text-sm sm:text-base text-neutral-700 dark:text-gray-300 mb-1.5 hover:!text-blue-500 transition-all">{index + 1} - {song.name}</a>
                </Link>
              )}
            </div>
            <Link href="/artists">
              <span className="text-blue-500 hover:text-blue-600 transition-all cursor-pointer text-sm font-medium">Back to Artists List</span>
            </Link>
          </div> */}
        </div>
      </main>
    </div>
  )
}
